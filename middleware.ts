export { auth as middleware } from "@/modules/auth/lib/auth";

export const config = {

    matcher:[
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],

};