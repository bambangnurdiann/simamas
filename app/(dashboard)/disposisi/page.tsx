import { AppShell } from "@/components/layout/app-shell";

export default function Page() {
  return (
    <AppShell title="Disposisi Surat">
      <div className="rounded-xl border bg-white p-4">
        <h3 className="mb-3 font-semibold">Timeline Disposisi</h3>
        <ol className="space-y-3 text-sm">
          <li><b>08:10</b> Sekretaris kirim surat AG-001 ke Pimpinan.</li>
          <li><b>08:35</b> Pimpinan disposisi ke Staff Umum + Staff Keuangan.</li>
          <li><b>09:20</b> Staff Umum update status: Diproses.</li>
        </ol>
      </div>
    </AppShell>
  );
export default function Page() {
  return <div className="p-6">Halaman disposisi</div>;
}
