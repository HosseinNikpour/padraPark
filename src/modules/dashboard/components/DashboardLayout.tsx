import { ReactNode } from "react";

interface Props {

    children: ReactNode;

}

export function DashboardLayout({

    children,

}: Props) {

    return (

        <div className="min-h-screen bg-gray-50">

            <main className="mx-auto max-w-7xl">

                {children}

            </main>

        </div>

    );

}