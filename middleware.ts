import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get language and region from localStorage if available
  const language = request.cookies.get('preferred-language')?.value;
  const region = request.cookies.get('preferred-region')?.value;

  // Set default values if not present
  if (!language) {
    response.cookies.set('preferred-language', 'en-US');
  }
  if (!region) {
    response.cookies.set('preferred-region', 'US');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};