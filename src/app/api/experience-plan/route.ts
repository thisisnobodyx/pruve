import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { industry } = await req.json();
  if (!industry?.trim()) {
    return NextResponse.json({ error: 'industry required' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 3000,
      system: `You are a product specialist at Pruve — an AI employee platform for small businesses.
When given an industry, you generate a realistic simulation of what a Pruve AI employee does in a full working day for that industry.
Return ONLY valid JSON. No markdown fences, no explanation.`,
      messages: [
        {
          role: 'user',
          content: `Generate a full Pruve AI employee experience for this industry: "${industry}"

Return a JSON object with EXACTLY this structure (all fields required):

{
  "id": "custom-${Date.now()}",
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
      const cleaned = text.text.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      plan = JSON.parse(cleaned);
      // Ensure id is unique
      plan.id = `custom-${industry.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
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
