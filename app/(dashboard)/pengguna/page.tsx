import { AppShell } from "@/components/layout/app-shell";

export default function Page() {
  return (
    <AppShell title="Manajemen Pengguna">
      <div className="rounded-xl border bg-white p-4 text-sm">
        <p>Modul user: tambah user, assign role, reset password, aktif/nonaktif.</p>
      </div>
    </AppShell>
  );
}
