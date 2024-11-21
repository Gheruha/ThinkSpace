import { getRouteHandlerSupabaseClient } from '@/lib/supabaseClients';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${url.origin}/auth/error`);
  }

  const supabase = getRouteHandlerSupabaseClient();

  // Exchange the authorization code for a session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data?.session) {
    console.error('Error exchanging code for session:', error?.message);
    return NextResponse.redirect(`${url.origin}/auth/error`);
  }

  // Destructure the session object from data
  const { session } = data;

  // Create a new response to redirect back to the home page
  const response = NextResponse.redirect(`${url.origin}/dashboard`);

  // Set cookies for session management
  response.cookies.set('sb-access-token', session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: session.expires_in,
  });

  response.cookies.set('sb-refresh-token', session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}