import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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