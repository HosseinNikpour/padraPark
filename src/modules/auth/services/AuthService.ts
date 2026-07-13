import { AuthRepository } from "../repository/AuthRepository";

export class AuthService {

    private repository =
        new AuthRepository();

    async login(
        username: string,
        password: string,
    ) {

        return this.repository.login(
            username,
            password,
        );

    }

    async logout() {

        return this.repository.logout();

    }

    async currentUser() {

        const session =
            await this.repository.session();

        return session?.user ?? null;

    }

    async isAuthenticated() {

        return !!(
            await this.currentUser()
        );

    }

    async hasRole(
        ...roles: string[]
    ) {

        const user =
            await this.currentUser();

        if (!user)
            return false;

        return roles.includes(
            (user as any).role
        );

    }

    async isAdmin() {

        return this.hasRole(
            "ADMIN"
        );

    }

}