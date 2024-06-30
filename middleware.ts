import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const token = await getToken({ req: request });
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/auth");
    const protectedPages = ["/admin", "/admin/dashboard"];
    const isProtectedPage = protectedPages.some((page) =>
      pathname.startsWith(page),
    );

    if (!isAuth && isProtectedPage) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isAuth && isProtectedPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/notAdham", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);

// Enable authentication for protected pages
export const config = {
  matcher: ["/admin/:path*"],
};
