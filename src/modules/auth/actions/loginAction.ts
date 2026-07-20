"use server";

import { signIn } from "../lib/auth";

export async function loginAction(
    username: string,
    password: string
) {

    await signIn("credentials", {

        username,

        password,

        redirectTo: "/dashboard",

    });

}