# Curapic

App cek kulit: user ambil foto kulit, hasil analisis disimpan per akun, dan riwayat bisa dilihat lagi.

## Auth

- **Pengguna** — pemilik akun aplikasi. Autentikasi via email/password atau Sign in with Google. Entitas berbeda dari Dokter.
- **Session** — pasangan access token (1 jam, auto-refresh) dan refresh token (14 hari) yang menjaga Pengguna tetap login. Disimpan dalam secure storage. Setelah 14 hari, Pengguna login ulang.
- **Profil** — data akun: nama + email.
- **VerifikasiEmail** — konfirmasi akun baru via kode OTP 6 digit yang dikirim ke email.
- **ResetPassword** — alur pulihkan akun: email → kode OTP → password baru → auto-login.

## Domain scan

- **Scan** — satu record hasil pemeriksaan kulit: foto, label hasil, tanggal. Dimiliki oleh satu Pengguna. Analisis AI berjalan lokal di perangkat (model tflite), bukan di server.
- **RiwayatScan** — kumpulan Scan milik satu Pengguna.

## Entitas lain

- **Dokter** — entitas terpisah, diakses lewat tab Doctor. Bukan Pengguna.