"use client";

import { Button } from "@/shared/ui/button";

import { AuthService } from "../services/AuthService";

export default function LogoutButton(){

    async function logout(){

        await new AuthService().logout();

    }

    return(

        <Button
            variant="outline"
            onClick={logout}
        >

            خروج

        </Button>

    );

}