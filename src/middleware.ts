import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// We only want the login and signup pages to be public. 
// Everything else, including your root dashboard and all APIs, will be shielded.
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // This will redirect unauthenticated traffic to your sign-in page.
    auth().protect();
  }
});

export const config = {
  matcher: [
    // This complex regex ensures we don't protect static files (images, css, js) 
    // but we DO protect the main pages and all /api routes.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
