"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, FileInput, FileOutput, FolderArchive, LayoutDashboard, Users, Waypoints } from "lucide-react";

const menus = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/surat-masuk", label: "Surat Masuk", icon: FileInput },
  { href: "/surat-keluar", label: "Surat Keluar", icon: FileOutput },
  { href: "/disposisi", label: "Disposisi", icon: Waypoints },
  { href: "/pengguna", label: "Pengguna", icon: Users },
  { href: "/arsip", label: "Arsip", icon: FolderArchive }
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="bg-emerald-950 p-4 text-white">
          <h1 className="mb-6 text-lg font-bold">SIMAMAS PA PASARWAJO</h1>
          <nav className="space-y-1">
            {menus.map((m) => {
              const ActiveIcon = m.icon;
              const active = pathname === m.href;
              return (
                <Link key={m.href} href={m.href} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-emerald-700" : "hover:bg-emerald-900"}`}>
                  <ActiveIcon className="h-4 w-4" />
                  {m.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main>
          <header className="flex items-center justify-between border-b bg-white px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
            <div className="flex items-center gap-3">
              <button className="rounded-md border p-2"><Bell className="h-4 w-4" /></button>
              <div className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">Admin</div>
            </div>
          </header>
          <section className="p-6">{children}</section>
        </main>
      </div>
    </div>
  );
}
