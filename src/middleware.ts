import { NextResponse, NextRequest } from "next/server"

const SUPPORTED_LANGUAGES = ["en", "ja", "bg", "zh-CN", "zh-TW", "hr", "cs", "da", "nl", "en-GB", "en-US", "fi", "fr", "de", "el", "hi", "hu", "id", "it", "ko", "lt", "no", "pl", "pt-BR", "ro", "ru", "es-ES", "es-419", "sv-SE", "th", "tr", "uk", "vi"];
const DEFAULT_LANGUAGE = "en";

function parseAcceptLanguageHeader(header: string | null): { code: string; q: number }[] {
  if (!header) {
    return [];
  }

  return header
    .split(',')
    .map(langEntry => {
      const parts = langEntry.trim().split(';q=');
      const code = parts[0].trim();
      const q = parts[1] ? parseFloat(parts[1]) : 1.0;
      if (isNaN(q)) {
        return null;
      }
      return { code, q };
    })
    .filter((lang): lang is { code: string; q: number } => lang !== null && lang.code !== '')
    .sort((a, b) => b.q - a.q);
}

export function middleware(request: NextRequest) {
  const { pathname, search, origin } = request.nextUrl;
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.match(
      /\.(ico|png|jpg|jpeg|gif|svg|webp|txt|xml|json|webmanifest|js|css|map|woff|woff2|ttf|eot)$/i
    )
  ) {
    return response;
  }

  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return response;
  }

  const acceptLanguageHeader = request.headers.get('accept-language');
  let preferredLanguage = DEFAULT_LANGUAGE;

  if (acceptLanguageHeader) {
    const parsedLangs = parseAcceptLanguageHeader(acceptLanguageHeader);
    if (parsedLangs.length > 0) {
      for (const lang of parsedLangs) {
        const langCode = lang.code.toLowerCase();

        if (SUPPORTED_LANGUAGES.includes(langCode)) {
          preferredLanguage = langCode;
          break;
        }

        const baseCode = langCode.split('-')[0];
        if (SUPPORTED_LANGUAGES.includes(baseCode)) {
          preferredLanguage = baseCode;
          break;
        }
      }
    }
  }

  let newPath = `/${preferredLanguage}`;
  if (pathname !== '/') {
    newPath += pathname;
  }

  const redirectUrl = new URL(newPath, origin);
  redirectUrl.search = search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.json).*)',
  ],
};