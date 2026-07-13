"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Header />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>
  );
}