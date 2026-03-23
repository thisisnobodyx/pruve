import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, checkDailyGlobalCap } from '@/lib/rate-limit';

const client = new Anthropic();

const DEMO_DAILY_CAP = parseInt(process.env.DEMO_DAILY_CAP || '500', 10);

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

  // Rate limit: 3 req/min, 10 req/hr per IP (expensive endpoint)
  const perMin = rateLimit('exp-min', ip, { windowMs: 60_000, maxRequests: 3 });
  if (!perMin.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(perMin.retryAfterMs / 1000)) } }
    );
  }
  const perHour = rateLimit('exp-hr', ip, { windowMs: 3_600_000, maxRequests: 10 });
  if (!perHour.allowed) {
    return NextResponse.json(
      { error: 'Hourly limit reached. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(perHour.retryAfterMs / 1000)) } }
    );
  }

  // Global daily cap (shared with demo chat)
  if (!checkDailyGlobalCap(DEMO_DAILY_CAP)) {
    return NextResponse.json(
      { error: 'Demo limit reached for today. Contact us at info@pruve.ca to see a full demo!' },
      { status: 429 }
    );
  }

  const { industry } = await req.json();
  if (!industry?.trim()) {
    return NextResponse.json({ error: 'industry required' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      system: `You are a product specialist at Pruve — an AI employee platform for small businesses.
When given an industry, you generate a realistic simulation of what a Pruve AI employee does in a full working day for that industry.
Return ONLY valid JSON. No markdown fences, no explanation.`,
      messages: [
        {
          role: 'user',
          content: `Generate a full Pruve AI employee experience for this industry: "${industry}"

Return a JSON object with EXACTLY this structure (all fields required):

{
  "label": "<industry name properly capitalized>",
  "emoji": "<single most fitting emoji>",
  "category": "Other",
  "tagline": "<one punchy sentence about what the AI does for this industry>",
  "dayEvents": [
    {
      "time": "6:00 AM",
      "title": "<event title specific to this industry>",
      "description": "<what a real customer/situation looks like — 1-2 sentences, industry-specific>",
      "aiResponse": "<exactly what the AI responds — realistic, detailed, uses industry-specific terminology>",
      "channel": "<one of: whatsapp|instagram|phone|email|system|google|facebook|sms>",
      "capability": "<one of: communication|memory|proactive|bookings|leads|revenue|reputation|content|reporting|browser|workflow|team|voice|multiagent|environment>",
      "tier": "<one of: operator|manager|executive>",
      "stat": { "key": "<messages|bookings|savings>", "increment": <number> }
    }
  ],
  "capabilityExamples": {
    "communication": "<one sentence specific to this industry>",
    "memory": "<one sentence specific to this industry>",
    "proactive": "<one sentence specific to this industry>",
    "bookings": "<one sentence specific to this industry>",
    "leads": "<one sentence specific to this industry>",
    "revenue": "<one sentence specific to this industry>",
    "reputation": "<one sentence specific to this industry>",
    "content": "<one sentence specific to this industry>"
  },
  "stats": {
    "messagesPerDay": <realistic number 20-100>,
    "bookingsPerWeek": <realistic number 5-30>,
    "monthlySavings": <realistic dollar amount 2000-12000>,
    "responseTime": "< X min"
  },
  "recommendedTier": "<operator|manager|executive>",
  "recommendationReason": "<1-2 sentences explaining why this tier fits this industry>"
}

Rules:
- Generate 10-12 dayEvents spread across 6 AM to 10 PM
- Every dayEvent must use REAL industry terminology (not generic placeholders)
- The aiResponse should sound like a real AI speaking to a real customer or business owner
- Mix channels realistically (WhatsApp, Instagram, email, system alerts, etc.)
- Include a morning briefing (proactive/operator), lead handling, bookings, a review response, and an after-hours message
- The stat field is optional — only include it when relevant (e.g. bookings increment when something is booked)
- No "your_industry_here" placeholders — every word must be specific to "${industry}"`,
        },
      ],
    });

    const text = response.content.find((b) => b.type === 'text');
    if (!text || text.type !== 'text') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    let plan;
    try {
      // Strip markdown fences if model wraps output
      const cleaned = text.text
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
        .trim();
      plan = JSON.parse(cleaned);
      // Always assign a stable unique id — never rely on the model for this
      plan.id = `custom-${industry.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, '\nRaw response:', text.text.slice(0, 500));
      return NextResponse.json({ error: 'Failed to parse AI response. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Experience plan error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI error' },
      { status: 500 },
    );
  }
}
