import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

/* Allow up to 30s on serverless (Vercel hobby = 10s, pro = 60s) */
export const maxDuration = 30;

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */
interface AuditResult {
  category: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  score: number;
}

function score(v: number): 'pass' | 'warning' | 'fail' {
  if (v >= 80) return 'pass';
  if (v >= 50) return 'warning';
  return 'fail';
}

/* ------------------------------------------------------------------ */
/* On-page crawl with cheerio                                          */
/* ------------------------------------------------------------------ */
async function crawlPage(targetUrl: string) {
  const res = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; PruveSEOBot/1.0; +https://pruve.ca)',
      'Accept': 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  });

  const finalUrl = res.url;
  const isHttps = finalUrl.startsWith('https');
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('title').text().trim();
  const metaDesc = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get();
  const imgTotal = $('img').length;
  const imgMissingAlt = $('img:not([alt]), img[alt=""]').length;
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  const ogDesc = $('meta[property="og:description"]').attr('content') || '';
  const ogImage = $('meta[property="og:image"]').attr('content') || '';
  const structuredData = $('script[type="application/ld+json"]').length;
  const wordCount = $('body').text().trim().split(/\s+/).length;

  const items: AuditResult[] = [];

  // Title
  const titleLen = title.length;
  const titleScore =
    titleLen === 0 ? 0 : titleLen < 20 ? 40 : titleLen > 65 ? 60 : 100;
  items.push({
    category: 'On-Page',
    label: 'Page Title',
    status: score(titleScore),
    detail:
      titleLen === 0
        ? 'Missing title tag'
        : titleLen > 65
          ? `Title is ${titleLen} chars — should be under 60`
          : titleLen < 20
            ? `Title is only ${titleLen} chars — aim for 50-60`
            : `Good length (${titleLen} chars)`,
    score: titleScore,
  });

  // Meta description
  const descLen = metaDesc.length;
  const descScore =
    descLen === 0 ? 0 : descLen < 70 ? 40 : descLen > 160 ? 55 : 100;
  items.push({
    category: 'On-Page',
    label: 'Meta Description',
    status: score(descScore),
    detail:
      descLen === 0
        ? 'Missing meta description'
        : descLen > 160
          ? `${descLen} chars — should be under 155`
          : descLen < 70
            ? `Only ${descLen} chars — aim for 120-155`
            : `Good length (${descLen} chars)`,
    score: descScore,
  });

  // H1 tag
  const h1Score = h1s.length === 1 ? 100 : h1s.length === 0 ? 0 : 50;
  items.push({
    category: 'On-Page',
    label: 'H1 Heading',
    status: score(h1Score),
    detail:
      h1s.length === 0
        ? 'No H1 heading found'
        : h1s.length > 1
          ? `${h1s.length} H1 tags found — should be exactly 1`
          : `Good — single H1: "${h1s[0].slice(0, 50)}${h1s[0].length > 50 ? '…' : ''}"`,
    score: h1Score,
  });

  // Image alt text
  const altScore =
    imgTotal === 0 ? 100 : Math.round(((imgTotal - imgMissingAlt) / imgTotal) * 100);
  items.push({
    category: 'On-Page',
    label: 'Image Alt Text',
    status: score(altScore),
    detail:
      imgTotal === 0
        ? 'No images found'
        : imgMissingAlt === 0
          ? `All ${imgTotal} images have alt text`
          : `${imgMissingAlt} of ${imgTotal} images missing alt text`,
    score: altScore,
  });

  // SSL
  items.push({
    category: 'Technical',
    label: 'SSL / HTTPS',
    status: isHttps ? 'pass' : 'fail',
    detail: isHttps ? 'Site served over HTTPS' : 'Not served over HTTPS — security risk',
    score: isHttps ? 100 : 0,
  });

  // Mobile viewport
  items.push({
    category: 'Technical',
    label: 'Mobile Viewport',
    status: hasViewport ? 'pass' : 'fail',
    detail: hasViewport
      ? 'Viewport meta tag present'
      : 'Missing viewport meta tag — not mobile-friendly',
    score: hasViewport ? 100 : 0,
  });

  // Canonical
  items.push({
    category: 'Technical',
    label: 'Canonical Tag',
    status: hasCanonical ? 'pass' : 'warning',
    detail: hasCanonical
      ? 'Canonical URL set'
      : 'No canonical tag — may cause duplicate content issues',
    score: hasCanonical ? 100 : 40,
  });

  // Open Graph
  const ogScore = ogTitle && ogDesc && ogImage ? 100 : ogTitle ? 60 : 0;
  items.push({
    category: 'On-Page',
    label: 'Open Graph Tags',
    status: score(ogScore),
    detail:
      ogScore === 100
        ? 'OG title, description, and image present'
        : ogScore > 0
          ? 'Missing some OG tags (description or image)'
          : 'No Open Graph tags found — poor social sharing',
    score: ogScore,
  });

  // Structured Data
  items.push({
    category: 'Technical',
    label: 'Structured Data',
    status: structuredData > 0 ? 'pass' : 'warning',
    detail:
      structuredData > 0
        ? `${structuredData} JSON-LD schema block(s) found`
        : 'No structured data — add schema for rich results',
    score: structuredData > 0 ? 100 : 30,
  });

  // Content depth
  const contentScore = wordCount > 1000 ? 100 : wordCount > 300 ? 70 : wordCount > 100 ? 40 : 15;
  items.push({
    category: 'On-Page',
    label: 'Content Depth',
    status: score(contentScore),
    detail: `~${wordCount} words — ${wordCount > 300 ? 'good for SEO' : 'thin content — aim for 800+'}`,
    score: contentScore,
  });

  return items;
}

/* ------------------------------------------------------------------ */
/* PageSpeed Insights (optional – needs PAGESPEED_API_KEY)             */
/* ------------------------------------------------------------------ */
async function fetchPageSpeed(targetUrl: string): Promise<AuditResult[]> {
  const key = process.env.PAGESPEED_API_KEY;
  if (!key) return []; // silently skip if no key

  try {
    const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    endpoint.searchParams.set('url', targetUrl);
    endpoint.searchParams.set('key', key);
    endpoint.searchParams.set('strategy', 'mobile');
    endpoint.searchParams.append('category', 'performance');
    endpoint.searchParams.append('category', 'seo');

    const res = await fetch(endpoint.toString(), { signal: AbortSignal.timeout(25_000) });
    if (!res.ok) return [];
    const data = await res.json();

    const perf = Math.round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100);
    const seoScore = Math.round((data.lighthouseResult?.categories?.seo?.score ?? 0) * 100);
    const fcp = data.lighthouseResult?.audits?.['first-contentful-paint']?.displayValue || '–';
    const lcp = data.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue || '–';
    const cls = data.lighthouseResult?.audits?.['cumulative-layout-shift']?.displayValue || '–';
    const tbt = data.lighthouseResult?.audits?.['total-blocking-time']?.displayValue || '–';

    return [
      {
        category: 'Speed',
        label: 'Performance Score',
        status: score(perf),
        detail: `Lighthouse performance: ${perf}/100`,
        score: perf,
      },
      {
        category: 'Speed',
        label: 'Core Web Vitals',
        status: score(perf),
        detail: `FCP: ${fcp}, LCP: ${lcp}, CLS: ${cls}, TBT: ${tbt}`,
        score: perf,
      },
      {
        category: 'Technical',
        label: 'Mobile SEO Score',
        status: score(seoScore),
        detail: `Lighthouse mobile SEO: ${seoScore}/100`,
        score: seoScore,
      },
    ];
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Check sitemap + robots.txt                                          */
/* ------------------------------------------------------------------ */
async function checkFiles(origin: string): Promise<AuditResult[]> {
  const items: AuditResult[] = [];
  try {
    const sm = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(5_000) });
    const hasSitemap = sm.ok && (await sm.text()).includes('<urlset');
    items.push({
      category: 'Technical',
      label: 'Sitemap',
      status: hasSitemap ? 'pass' : 'fail',
      detail: hasSitemap ? 'sitemap.xml found and valid' : 'No sitemap.xml found',
      score: hasSitemap ? 100 : 0,
    });
  } catch {
    items.push({ category: 'Technical', label: 'Sitemap', status: 'fail', detail: 'Could not check sitemap.xml', score: 0 });
  }
  try {
    const rb = await fetch(`${origin}/robots.txt`, { signal: AbortSignal.timeout(5_000) });
    const hasRobots = rb.ok && (await rb.text()).length > 10;
    items.push({
      category: 'Technical',
      label: 'Robots.txt',
      status: hasRobots ? 'pass' : 'warning',
      detail: hasRobots ? 'robots.txt found' : 'No robots.txt found',
      score: hasRobots ? 100 : 30,
    });
  } catch {
    items.push({ category: 'Technical', label: 'Robots.txt', status: 'warning', detail: 'Could not check robots.txt', score: 30 });
  }
  return items;
}

/* ------------------------------------------------------------------ */
/* HANDLER                                                             */
/* ------------------------------------------------------------------ */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let rawUrl = searchParams.get('url')?.trim();

  if (!rawUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Normalise
  if (!/^https?:\/\//i.test(rawUrl)) rawUrl = `https://${rawUrl}`;

  try {
    const parsedUrl = new URL(rawUrl);
    const origin = parsedUrl.origin;

    // Run all checks in parallel — allSettled so one failure doesn't kill everything
    const [crawlResult, psiResult, fileResult] = await Promise.allSettled([
      crawlPage(rawUrl),
      fetchPageSpeed(rawUrl),
      checkFiles(origin),
    ]);

    const crawlItems = crawlResult.status === 'fulfilled' ? crawlResult.value : [];
    const psiItems = psiResult.status === 'fulfilled' ? psiResult.value : [];
    const fileItems = fileResult.status === 'fulfilled' ? fileResult.value : [];

    // If the crawl itself failed we have no data — return error
    if (crawlItems.length === 0 && psiItems.length === 0) {
      const reason = crawlResult.status === 'rejected' ? crawlResult.reason?.message : 'unknown';
      return NextResponse.json(
        { error: `Could not reach ${rawUrl} — ${reason}` },
        { status: 502 },
      );
    }

    const items = [...psiItems, ...crawlItems, ...fileItems];
    const overall = items.length > 0
      ? Math.round(items.reduce((s, i) => s + i.score, 0) / items.length)
      : 0;

    return NextResponse.json({ url: rawUrl, overallScore: overall, items });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to audit: ${err.message || 'Unknown error'}` },
      { status: 500 },
    );
  }
}
