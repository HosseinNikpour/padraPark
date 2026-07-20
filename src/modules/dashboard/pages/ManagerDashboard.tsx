import { CurrentUser } from "@/core/auth/currentUser";

export function ManagerDashboard({

    user,

}: {

    user: CurrentUser;

}) {

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold">

                Manager Dashboard

            </h1>

        </div>

    );

}