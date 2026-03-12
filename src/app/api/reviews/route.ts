import { NextResponse } from 'next/server';

/**
 * Google Places API Reviews endpoint.
 * Fetches reviews from the Google Places API and caches them.
 *
 * Required env vars:
 * - GOOGLE_PLACES_API_KEY: Google Cloud API key with Places API enabled
 * - GOOGLE_PLACE_ID: The Place ID for the business (find at https://developers.google.com/maps/documentation/places/web-service/place-id)
 */

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
  time: number;
}

interface GooglePlaceResult {
  result?: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
    name?: string;
  };
  status: string;
}

// In-memory cache with 1-hour TTL
let cachedReviews: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { reviews: [], error: 'Google Places API not configured' },
      { status: 200 }
    );
  }

  // Return cached data if fresh
  if (cachedReviews && Date.now() - cachedReviews.timestamp < CACHE_TTL) {
    return NextResponse.json(cachedReviews.data);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data: GooglePlaceResult = await res.json();

    if (data.status !== 'OK' || !data.result?.reviews) {
      return NextResponse.json(
        { reviews: [], error: `Google API status: ${data.status}` },
        { status: 200 }
      );
    }

    const reviews = data.result.reviews
      .filter((r) => r.rating >= 4) // Only show 4+ star reviews
      .sort((a, b) => b.time - a.time) // Most recent first
      .map((r) => ({
        name: r.author_name,
        quote: r.text,
        rating: r.rating,
        timeAgo: r.relative_time_description,
        photo: r.profile_photo_url || null,
      }));

    const responseData = {
      reviews,
      overallRating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0,
      businessName: data.result.name || '',
    };

    // Cache the result
    cachedReviews = { data: responseData, timestamp: Date.now() };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Google Reviews API error:', error);
    return NextResponse.json(
      { reviews: [], error: 'Failed to fetch reviews' },
      { status: 200 }
    );
  }
}
