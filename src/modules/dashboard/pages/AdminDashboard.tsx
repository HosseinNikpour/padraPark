import { CurrentUser } from "@/core/auth/currentUser";

export function AdminDashboard({

    user,

}: {

    user: CurrentUser;

}) {

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold">

                Admin Dashboard

            </h1>

        </div>

    );

}