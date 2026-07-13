import {
    auth,
    signIn,
    signOut,
} from "../lib/auth";

export class AuthRepository {

    async login(
        username: string,
        password: string,
    ) {

        return signIn(
            "credentials",
            {
                username,
                password,
                redirect: false,
            }
        );

    }

    async logout() {

        return signOut({
            redirect: false,
        });

    }

    async session() {

        return auth();

    }

}