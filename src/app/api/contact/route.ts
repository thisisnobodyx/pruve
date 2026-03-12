import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Force dynamic so env vars are read at runtime, not baked in at build
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const OWNER_EMAIL = process.env.CONTACT_EMAIL || 'info@pruve.ca';

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set. Available env keys:', Object.keys(process.env).filter(k => k.includes('RESEND') || k.includes('CONTACT')));
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly at info@pruve.ca' },
        { status: 500 },
      );
    }
    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, email, phone, company, industry, size, serviceType, message } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 },
      );
    }

    // Map service type to readable name
    const serviceLabels: Record<string, string> = {
      'ai-employee': 'AI Employee',
      'ai-agent': 'AI Agent',
      'web-design': 'Web Design',
      'seo': 'SEO Services',
    };

    const serviceName = serviceLabels[serviceType] || serviceType || 'Not specified';

    // Build the email HTML
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0A1E; color: #F2F0EB; padding: 32px; border-radius: 12px;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px;">
          <h1 style="color: #7C3AED; font-size: 24px; margin: 0 0 4px;">New Contact Form Submission</h1>
          <p style="color: #9590A8; font-size: 14px; margin: 0;">From pruve.ca contact page</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #7C3AED;">${escapeHtml(email)}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;">${escapeHtml(phone)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Company</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;">${escapeHtml(company || 'Not specified')}</td>
          </tr>
          ${industry ? `<tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Industry</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;">${escapeHtml(industry)}</td>
          </tr>` : ''}
          ${size ? `<tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Team Size</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;">${escapeHtml(size)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Service</td>
            <td style="padding: 10px 0; color: #7C3AED; font-size: 15px; font-weight: bold;">${escapeHtml(serviceName)}</td>
          </tr>
          ${message ? `<tr>
            <td style="padding: 10px 0; color: #9590A8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: #F2F0EB; font-size: 15px;">${escapeHtml(message)}</td>
          </tr>` : ''}
        </table>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 24px; padding-top: 16px;">
          <p style="color: #9590A8; font-size: 12px; margin: 0;">
            Reply directly to this email to respond to ${escapeHtml(name)}.
          </p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: 'Pruve Contact Form <contact@pruve.ca>',
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `New inquiry from ${name} — ${serviceName}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: err.message || 'Something went wrong.' },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
