"use server";

import { AuthService } from "../services/AuthService";

export async function loginAction(
    username: string,
    password: string
) {
    return new AuthService().login(
        username,
        password
    );
}