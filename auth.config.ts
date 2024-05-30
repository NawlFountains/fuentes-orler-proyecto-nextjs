import next from 'next';
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminDashboard = nextUrl.pathname.startsWith('/invoices');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/invoices',nextUrl));
      }
      if (isOnAdminDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;