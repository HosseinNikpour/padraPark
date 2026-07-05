import Link from "next/link";

const menus = [
  {
    title: "🏠 داشبورد",
    href: "/",
  },
  {
    title: "📦 اطلاعات پایه",
    href: "/menu",
  },
  {
    title: "📅 گزارش روزانه",
    href: "/daily-report",
  },
  {
    title: "📊 گزارشات",
    href: "/reports",
  },
  {
    title: "🔧 خرابی دستگاه‌ها",
    href: "/issues",
  },
  {
    title: "⚠️ حوادث",
    href: "/incidents",
  },
  {
    title: "📝 وقایع روزانه",
    href: "/events",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        PADRA
      </div>

      <nav className="p-3 space-y-1">

        {menus.map((menu) => (

          <Link
            key={menu.href}
            href={menu.href}
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            {menu.title}
          </Link>

        ))}

      </nav>

    </aside>
  );
}