import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

// Vercel Edge / Web runtime friendly default export
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { messages } = await request.json();

  try {
    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      messages,
      maxTokens: 4000,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Optional: Next.js/Vercel Edge runtime
export const config = { runtime: 'edge' } as const;
