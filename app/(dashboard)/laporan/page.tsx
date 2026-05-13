import { AppShell } from "@/components/layout/app-shell";

export default function Page() {
  return (
    <AppShell title="Laporan">
      <div className="rounded-xl border bg-white p-4 text-sm">
        Filter laporan per tanggal/bulan/tahun/user. Export PDF dan Excel tersedia pada tahap integrasi backend final.
      </div>
    </AppShell>
  );
}
