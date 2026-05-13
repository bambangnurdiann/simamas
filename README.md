# Sistem Informasi Surat & Disposisi — PA Pasarwajo Kelas II B

## Stack
Next.js 15, TypeScript, TailwindCSS, shadcn/ui-ready, Prisma, PostgreSQL, JWT auth, RBAC.

## Struktur Folder
- `app/` UI + API routes
- `components/` reusable components
- `lib/` auth, prisma, validation, rbac
- `prisma/` schema dan seed
- `public/uploads/` arsip dokumen PDF

## ERD (ringkas)
`roles 1..n users`, `users 1..n incoming_letters/outgoing_letters`, `incoming_letters 1..n dispositions`, `dispositions n..n users (via disposition_recipients)`, `users 1..n notifications`, `users 1..n activity_logs`, `attachments` polymorphic ke surat/disposisi.

## Flowchart Disposisi
1) Sekretaris input surat masuk -> 2) Kirim ke Pimpinan -> 3) Pimpinan buat disposisi (multi tujuan) -> 4) Staff tindak lanjut -> 5) Update status pending/diproses/selesai -> 6) Riwayat & audit tersimpan.

## Hak Akses Role
- Admin: kelola semua modul + user + export + backup.
- Pimpinan: lihat surat masuk, buat disposisi, pantau riwayat.
- Sekretaris: CRUD surat masuk/keluar, upload scan, monitoring.
- Staff: terima disposisi, update tindak lanjut.

## Instalasi
1. `cp .env.example .env`
2. Buat DB PostgreSQL lokal `simamas`
3. `npm install`
4. `npx prisma migrate dev --name init`
5. `npm run prisma:seed`
6. `npm run dev`

## Deploy LAN kantor
- Jalankan server: `npm run build && npm run start`
- PM2: `pm2 start npm --name simamas -- start`
- Akses dari LAN: `http://IP_LOKAL_SERVER:3000`
- (Opsional) Nginx reverse proxy port 80 ke 3000.

## Backup database manual
`pg_dump -U postgres -h localhost -d simamas > backup_simamas.sql`

## Dummy screenshot preview (deskripsi)
- Dashboard: sidebar hijau tua, topbar putih, kartu statistik emas-putih, grafik bulanan.
- Surat Masuk: tabel modern, filter tanggal, preview PDF panel kanan.
- Disposisi: timeline vertikal status berantai dengan badge pending/diproses/selesai.
