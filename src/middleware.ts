import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { getTenantBySlug, getUserTenants } from "@/data/tenant";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const tenantSlug = nextUrl.pathname.split('/')[1];
  const isTenantRoute = !!tenantSlug && tenantSlug !== 'api' && tenantSlug !== 'auth';
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isTenantRoute && isLoggedIn) {
    const tenant = await getTenantBySlug(tenantSlug);
    
    if (!tenant) {
      return Response.redirect(new URL('/select-tenant', nextUrl));
    }
    
    const userTenants = await getUserTenants(req.auth?.userId);
    const hasTenantAccess = userTenants.some(t => t.tenantId === tenant.id);
    
    if (!hasTenantAccess) {
      return Response.redirect(new URL('/unauthorized', nextUrl));
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`, 
      nextUrl
    ));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};