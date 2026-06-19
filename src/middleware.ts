import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes are completely public
const isPublicRoute = createRouteMatcher([
  '/', // Explicitly allowed for crawlers and initial landing
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/.well-known(.*)' 
]);

export default clerkMiddleware((auth, req) => {
  // 1. Bypass for Googlebot: Allows the crawler to read your HTML code
  const userAgent = req.headers.get("user-agent") || "";
  if (userAgent.includes("Googlebot")) {
    return NextResponse.next();
  }

  // 2. Bypass for the Root Path: Ensures the crawler can land on your homepage
  if (req.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // 3. Protect all other routes: Keeps your portal secure
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

// Configure the matcher
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
