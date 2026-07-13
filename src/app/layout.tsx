import "./globals.css";
import AppLayout from "@/shared/layout/AppLayout";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html      lang="fa"      dir="rtl"      className={vazir.variable}      suppressHydrationWarning    >
      <body className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}