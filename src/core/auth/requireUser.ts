import { redirect } from "next/navigation";

import { currentUser } from "./currentUser";

export async function requireUser() {

    try {

        return await currentUser();

    }
    catch {

        redirect("/login");

    }

}