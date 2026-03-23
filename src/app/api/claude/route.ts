import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, checkDailyGlobalCap } from '@/lib/rate-limit';

const client = new Anthropic();

const DEMO_DAILY_CAP = parseInt(process.env.DEMO_DAILY_CAP || '500', 10);

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

  // Rate limit: 10 req/min, 30 req/hr per IP
  const perMin = rateLimit('claude-min', ip, { windowMs: 60_000, maxRequests: 10 });
  if (!perMin.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(perMin.retryAfterMs / 1000)) } }
    );
  }
  const perHour = rateLimit('claude-hr', ip, { windowMs: 3_600_000, maxRequests: 30 });
  if (!perHour.allowed) {
    return NextResponse.json(
      { error: 'Hourly limit reached. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(perHour.retryAfterMs / 1000)) } }
    );
  }

  // Global daily cap
  if (!checkDailyGlobalCap(DEMO_DAILY_CAP)) {
    return NextResponse.json(
      { error: 'Demo limit reached for today. Contact us at info@pruve.ca to see a full demo!' },
      { status: 429 }
    );
  }

  try {
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt || 'You are a helpful AI assistant.',
      messages: messages,
    });

    const textContent = response.content.find((block) => block.type === 'text');

    return NextResponse.json({
      content: textContent ? textContent.text : '',
    });
  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
