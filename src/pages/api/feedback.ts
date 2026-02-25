import type { APIRoute } from 'astro';

interface FeedbackPayload {
  rating: number;
  message: string;
}

// Store feedback in-memory for now (will be replaced with proper database/email service)
const feedbackStore: (FeedbackPayload & { timestamp: string })[] = [];

export const POST: APIRoute = async ({ request }) => {
  // Basic CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
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

    // Message is optional, but sanitize if provided
    const message = body.message ? String(body.message).trim().slice(0, 5000) : '';

    // Create feedback record with timestamp
    const feedbackRecord = {
      rating: body.rating,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Store feedback
    feedbackStore.push(feedbackRecord);

    // TODO: In production, send to reviews@globalrestorationky.us via Resend
    // Example implementation:
    // const response = await resend.emails.send({
    //   from: 'feedback@globalrestorationky.us',
    //   to: 'reviews@globalrestorationky.us',
    //   subject: `New Feedback Submission - Rating: ${body.rating}/5`,
    //   html: `<p>Rating: ${body.rating}/5</p><p>Message: ${message}</p>`,
    // });

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

// Optional: GET endpoint to retrieve feedback (useful for development/debugging)
// Remove in production or protect with authentication
export const GET: APIRoute = () => {
  // This is for development/debugging only
  // In production, implement proper authentication before exposing
  return new Response(
    JSON.stringify({
      message: 'Use POST to submit feedback',
      debug: process.env.NODE_ENV === 'development' ? feedbackStore : 'Not available',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
