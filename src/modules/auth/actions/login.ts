"use server";

import { loginAction } from "@/modules/auth/actions/loginAction";

export async function LoginAction(
    username: string,
    password: string
) {
    return await loginAction(
    username,
    password
);
}