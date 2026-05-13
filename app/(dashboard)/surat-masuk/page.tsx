import { AppShell } from "@/components/layout/app-shell";

export default function Page() {
  return (
    <AppShell title="Surat Masuk">
      <div className="rounded-xl border bg-white p-4">
        <div className="mb-3 flex gap-2">
          <input className="rounded-md border px-3 py-2 text-sm" placeholder="Cari nomor/pengirim..." />
          <button className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">+ Tambah Surat</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b text-slate-500"><th>No Agenda</th><th>Pengirim</th><th>Perihal</th><th>Status</th></tr></thead>
          <tbody>
            <tr className="border-b"><td>AG-001</td><td>Kemenag Buton</td><td>Undangan Rapat</td><td>Pending</td></tr>
            <tr><td>AG-002</td><td>BKN Regional</td><td>Pembinaan ASN</td><td>Selesai</td></tr>
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
