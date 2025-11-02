import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { ACCESS_TOKEN_KEY } from "./libs/constants";
import { getToken } from "next-auth/jwt";
import { appConfig } from "./config/config";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const publicRoutes = ["/login"]

export default async function middleware(request: NextRequest) {
 
  const session:any = await getToken({
    req: request,
    secret: appConfig.NextAuthSecret,
  })
  // const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value; // Get token from cookies
  const token = session?.data?.signIn?.accessToken; // Get token from cookies
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);

  if (!token && pathname !== `/${locale}/login`){
    return NextResponse.redirect(new URL(`/${locale}/login` , request.url))
  }
  if (token && pathname === `/${locale}/login`){
    return NextResponse.redirect(new URL(`/${locale}` , request.url))
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}