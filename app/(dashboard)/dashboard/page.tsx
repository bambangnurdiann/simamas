import { AppShell } from "@/components/layout/app-shell";

const cards = [
  ["Surat Masuk", "128"],
  ["Surat Keluar", "84"],
  ["Disposisi Pending", "17"],
  ["Selesai Hari Ini", "12"]
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-emerald-800">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Aktivitas Terbaru</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Surat masuk No. 021/PA-PWJ/V/2026 didisposisikan ke Staff Umum.</li>
          <li>Surat keluar No. 040/PA-PWJ/V/2026 berhasil diekspor PDF.</li>
          <li>Disposisi #DPS-102 ditandai selesai oleh Staff Kepegawaian.</li>
        </ul>
      </div>
    </AppShell>
  );
export default function DashboardPage() {
  return <div className="p-6">Dashboard statistik surat masuk/keluar/disposisi.</div>;
}
