import type { APIRoute } from 'astro';

interface PositiveReviewPayload {
  rating?: number;
  timestamp?: string;
  page?: string;
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
function buildEmailBody(data: PositiveReviewPayload): string {
  return `
    <h2>Positive Review Received</h2>
    <p><strong>Rating:</strong> ${data.rating} out of 5 stars</p>
    <p>A customer has left a positive review! They may have left it on Google or Facebook.</p>
    ${data.timestamp ? `<p><small>Submitted: ${data.timestamp}</small></p>` : ''}
    <hr>
    <p><small>Great work! Keep it up.</small></p>
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
    const body = (await request.json()) as PositiveReviewPayload;

    // Validate rating
    if (!body.rating || typeof body.rating !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Invalid rating' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (body.rating < 4 || body.rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Rating must be 4 or 5 for positive review' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create review record
    const reviewRecord = {
      rating: body.rating,
      timestamp: body.timestamp || new Date().toISOString(),
      page: body.page || '/review',
    };

    // Send notification email to positive reviews bucket
    const toEmail = import.meta.env.RESEND_TO_REVIEWS_POSITIVE_EMAIL;
    if (toEmail) {
      const subject = `Positive Review: ${body.rating}/5 stars ⭐`;
      const htmlBody = buildEmailBody(reviewRecord);

      const emailSent = await sendEmailViaResend(toEmail, subject, htmlBody);
      if (!emailSent) {
        console.error('Failed to send positive review notification, but submission continues');
      }
    }

    console.log('Positive review notification sent:', reviewRecord);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for the positive review!',
        id: `review_positive_${Date.now()}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Positive review submission error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to process review',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
