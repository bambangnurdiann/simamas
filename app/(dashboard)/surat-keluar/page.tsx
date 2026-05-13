import { AppShell } from "@/components/layout/app-shell";

export default function Page() {
  return (
    <AppShell title="Surat Keluar">
      <div className="rounded-xl border bg-white p-4">
        <p className="mb-3 text-sm text-slate-500">Kelola surat keluar, export PDF/Excel, dan pelacakan tujuan.</p>
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b text-slate-500"><th>No Surat</th><th>Tujuan</th><th>Perihal</th><th>Tanggal</th></tr></thead>
          <tbody><tr><td>040/PA/V/2026</td><td>Pemda Buton</td><td>Permohonan Data</td><td>2026-05-13</td></tr></tbody>
        </table>
      </div>
    </AppShell>
  );
}
export default function Page() { return <div className=\"p-6\">Halaman surat-keluar</div>; }
