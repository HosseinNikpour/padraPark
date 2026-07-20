import { requireUser } from "@/core/auth/requireUser";

export default async function DashboardLayout({

    children,

}: {

    children: React.ReactNode;

}) {

    await requireUser();

    return children;

}