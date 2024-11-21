import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const redirectUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${process.env.NEXT_PUBLIC_SITE_URL}/auth/components/routes/callback`;

  return NextResponse.redirect(redirectUrl);
}