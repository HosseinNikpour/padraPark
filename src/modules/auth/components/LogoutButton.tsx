"use client";

import { Button } from "@/shared/ui/button";

import { logoutAction } from "@/modules/auth/actions/logoutAction";

export default function LogoutButton(){

    async function logout(){

        await logoutAction();

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