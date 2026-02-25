import type { APIRoute } from 'astro';

interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
  score?: number;
  score_reason?: string[];
}

interface FeedbackPayload {
  rating?: number;
  name?: string;
  email?: string;
  message?: string;
  timestamp?: string;
  'cf-turnstile-response'?: string;
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

// Build HTML email body
function buildEmailBody(data: FeedbackPayload): string {
  return `
    <h2>Customer Feedback: ${data.rating}/5 Stars</h2>
    <p><strong>Name:</strong> ${data.name || '(not provided)'}</p>
    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
    <p><strong>Rating:</strong> ${data.rating} out of 5 stars</p>
    ${data.message ? `<p><strong>Message:</strong></p><p>${(data.message || '').replace(/\n/g, '<br>')}</p>` : '<p><em>No additional message provided.</em></p>'}
    <hr>
    <p><small>Submitted: ${data.timestamp || new Date().toISOString()}</small></p>
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
    // Parse JSON payload
    const body = (await request.json()) as FeedbackPayload;

    // Validate required fields
    if (!body.rating || typeof body.rating !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Invalid rating' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (body.rating < 1 || body.rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Rating must be between 1 and 5' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate name
    if (!body.name || !String(body.name).trim()) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate message
    if (!body.message || !String(body.message).trim()) {
      return new Response(
        JSON.stringify({ error: 'Feedback message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify Turnstile token
    const turnstileToken = body['cf-turnstile-response'];
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

    // Sanitize fields
    const name = String(body.name).trim().slice(0, 500);
    const email = body.email ? String(body.email).trim().slice(0, 500) : null;
    const message = String(body.message).trim().slice(0, 5000);

    // Create feedback record with timestamp
    const feedbackRecord = {
      rating: body.rating,
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Send email to negative reviews bucket (only for low ratings)
    // Rating 1-3 = needs action
    if (body.rating >= 1 && body.rating <= 3) {
      const toEmail = import.meta.env.RESEND_TO_REVIEWS_NEGATIVE_EMAIL;
      if (toEmail) {
        const subject = `Feedback: ${body.rating}/5 stars — Action Required`;
        const htmlBody = buildEmailBody(feedbackRecord);

        const emailSent = await sendEmailViaResend(toEmail, subject, htmlBody);
        if (!emailSent) {
          console.error('Failed to send feedback email, but form submission continues');
        }
      }
    }

    console.log('Feedback received:', feedbackRecord);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Feedback submitted successfully',
        id: `feedback_${Date.now()}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to submit feedback',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
