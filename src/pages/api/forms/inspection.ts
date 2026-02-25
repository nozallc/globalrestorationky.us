import type { APIRoute } from 'astro';

interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
  score?: number;
  score_reason?: string[];
}

interface InspectionFormData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  issue_type?: string;
  insurance_claim?: string;
  details?: string;
  'cf-turnstile-response'?: string;
  source_page?: string;
}

// Verify Turnstile token with Cloudflare
async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: remoteIp,
      }),
    });

    if (!response.ok) {
      console.error('Turnstile verification request failed:', response.status);
      return false;
    }

    const data = (await response.json()) as TurnstileVerifyResponse;
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Send email via Resend
async function sendEmailViaResend(
  to: string,
  subject: string,
  htmlBody: string
): Promise<boolean> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error('Resend configuration missing: RESEND_API_KEY or RESEND_FROM_EMAIL');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: to,
        subject: subject,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', response.status, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Resend email send error:', error);
    return false;
  }
}

// Parse form data from request
async function parseFormData(request: Request): Promise<InspectionFormData> {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return await request.json();
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await request.text();
    const params = new URLSearchParams(text);
    return {
      first_name: params.get('first_name') || undefined,
      last_name: params.get('last_name') || undefined,
      phone: params.get('phone') || undefined,
      email: params.get('email') || undefined,
      address: params.get('address') || undefined,
      city: params.get('city') || undefined,
      issue_type: params.get('issue_type') || undefined,
      insurance_claim: params.get('insurance_claim') || undefined,
      details: params.get('details') || undefined,
      'cf-turnstile-response': params.get('cf-turnstile-response') || undefined,
      source_page: params.get('source_page') || undefined,
    };
  }

  return {};
}

// Validate required fields
function validateInspectionForm(data: InspectionFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.first_name?.trim()) errors.push('First name is required');
  if (!data.last_name?.trim()) errors.push('Last name is required');
  if (!data.phone?.trim()) errors.push('Phone is required');
  if (!data.address?.trim()) errors.push('Address is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.issue_type?.trim()) errors.push('Issue type is required');
  if (!data.details?.trim()) errors.push('Details are required');

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Build HTML email body
function buildEmailBody(data: InspectionFormData): string {
  return `
    <h2>New Inspection Request</h2>
    <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email || '(not provided)'}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>Issue Type:</strong> ${data.issue_type}</p>
    <p><strong>Insurance Claim:</strong> ${data.insurance_claim || 'Not specified'}</p>
    <p><strong>Details:</strong></p>
    <p>${(data.details || '').replace(/\n/g, '<br>')}</p>
    <hr>
    <p><small>Submitted from: ${data.source_page || 'inspection'} | ${new Date().toISOString()}</small></p>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse form data
    const data = await parseFormData(request);

    // Verify Turnstile token
    const turnstileToken = data['cf-turnstile-response'];
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: 'Turnstile verification token missing' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP for Turnstile verification
    const clientIp =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      'unknown';

    const turnstileValid = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileValid) {
      return new Response(
        JSON.stringify({ error: 'Turnstile verification failed. Please try again.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate form fields
    const validation = validateInspectionForm(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email to leads bucket
    const toEmail = import.meta.env.RESEND_TO_LEADS_EMAIL;
    if (!toEmail) {
      console.error('RESEND_TO_LEADS_EMAIL not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const subject = `New Inspection Request — ${data.issue_type} — ${data.city} — ${data.phone}`;
    const htmlBody = buildEmailBody(data);

    const emailSent = await sendEmailViaResend(toEmail, subject, htmlBody);

    if (!emailSent) {
      return new Response(
        JSON.stringify({ error: 'Failed to send email. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your inspection request has been received. We will call you within 2 hours.',
        id: `inspection_${Date.now()}`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Inspection form error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
