import { Building2, Lock, Mail, Scale } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,83,45,0.22),_transparent_40%)]" />
      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 p-6 lg:grid-cols-2">
        <section className="hidden rounded-2xl border border-emerald-900/20 bg-emerald-950 p-10 text-white shadow-2xl lg:block">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Scale className="h-4 w-4 text-amber-300" />
            Pengadilan Agama Pasarwajo Kelas II B
          </div>
          <h1 className="text-4xl font-bold leading-tight">Sistem Informasi Surat Masuk, Surat Keluar, dan Disposisi</h1>
          <p className="mt-4 text-emerald-100/90">
            Platform internal berbasis LAN untuk pencatatan surat resmi, alur disposisi pimpinan, dan monitoring tindak lanjut staf.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            {["Aman (JWT Session)", "Multi Role (RBAC)", "Arsip Digital PDF", "Laporan Cepat"].map((item) => (
              <div key={item} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-700 p-3 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900">Login SIMAMAS</h2>
              <p className="text-sm text-slate-600">Sistem Informasi Surat & Disposisi — PA Pasarwajo Kelas II B</p>
            </div>
          </div>

          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <input type="email" placeholder="admin@pa-pasarwajo.go.id" className="w-full border-0 py-3 text-sm outline-none" />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3">
                <Lock className="h-4 w-4 text-slate-500" />
                <input type="password" placeholder="••••••••" className="w-full border-0 py-3 text-sm outline-none" />
              </div>
            </label>

            <button type="button" className="w-full rounded-lg bg-emerald-700 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Masuk ke Dashboard
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-500">Demo UI v1 · Aplikasi berjalan di jaringan lokal internal kantor.</p>
        </section>
export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-primary">Login SIMAMAS</h1>
        <p className="text-sm text-slate-600">Sistem Informasi Surat & Disposisi — PA Pasarwajo Kelas II B</p>
      </div>
    </main>
  );
}
