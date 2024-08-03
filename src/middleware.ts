import {
    clerkMiddleware,
    createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/', '/chat(.*)', '/quiz(.*)']);
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
    const authResult = auth();
    const pathName = req.nextUrl.pathname;

    // if (isProtectedRoute(req)) {
    if (!isPublicRoute(req)) {
        if (authResult.userId == null) {
            const signInUrl = new URL('/sign-in', req.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
});

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
// export default clerkMiddleware((auth, request) => {
//     if (!isPublicRoute(request)) {
//         auth().protect();
//     }
// });

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};