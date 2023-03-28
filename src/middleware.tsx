import { NextRequest, NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export async function middleware(request: NextRequest) {
  if (request.cookies.has("x-token")) {
    const token = request.cookies.get("x-token")?.value;

    const decoded: any = jwt_decode(token!);

    if (decoded.exp * 1000 < Date.now()) {
      console.log("borrado");
      request.cookies.delete("x-token");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const resp = await fetch(
      `https://apix.moelist.online/getuserid/${decoded.id}`,
      {
        method: "GET",
      }
    );

    const { user } = await resp.json();

    if (!user) {
      request.cookies.delete("x-token");
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      request.nextUrl.pathname.endsWith("/publicar") &&
      user.role !== "Author"
    ) {
      return NextResponse.redirect(new URL("/user/configurar", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/user", "/user/:path*"],
};
