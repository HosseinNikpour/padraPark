import { ReactNode } from "react";

interface Props {

    children: ReactNode;

}

export function DashboardGrid({

    children,

}: Props) {

    return (

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {children}

        </div>

    );

}