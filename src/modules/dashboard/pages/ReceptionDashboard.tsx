import { CurrentUser } from "@/core/auth/currentUser";

export function ReceptionDashboard({

    user,

}: {

    user: CurrentUser;

}) {

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold">

                Reception Dashboard

            </h1>

        </div>

    );

}