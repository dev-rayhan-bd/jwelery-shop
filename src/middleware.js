import { NextResponse } from "next/server";
export function middleware(request) {

    // const path = request.nextUrl.pathname
    // console.log(path);

    const token = request.cookies.get('jewellery-web-token');
    // console.log("from middleware", token);

    if (!token) {
        // const redirectUrl = "/auth/signIn"
        // return NextResponse.redirect(new URL(redirectUrl, request.url));
        return NextResponse.redirect(new URL('/auth/signIn', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/myCart',
        '/profile',
        '/editProfile',
        '/changPass',
        '/changeAddress',
        '/myOrder',
        '/favorite',
        '/checkOut',
        '/customize',
        // '/profile/:path*',
    ],
};
