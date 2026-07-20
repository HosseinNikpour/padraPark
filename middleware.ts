export { auth as middleware } from "@/modules/auth/lib/auth";

export const config = {

    matcher:[
      
        "/dashboard/:path*",

        "/checklists/:path*",

        "/devices/:path*",

        "/issues/:path*",

        "/reports/:path*",

        "/users/:path*",
    ],

};