# datanusa-statistik-indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/hakeno337/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/hakeno337/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**DataNusa — Statistik Indonesia** adalah situs statistik nasional Indonesia yang berjalan di browser dari file statis — tanpa build step, tanpa network, tanpa library. Delapan kartu indikator utama (penduduk 281,6 juta; pertumbuhan ekonomi 5,03%; kemiskinan 9,03%; IPM 75,02; inflasi 1,57%; pengangguran 4,91%; ekspor US$264,7 miliar; 38 provinsi), deret 2019–2024, piramida umur, dan penjelajah 38 provinsi dengan pencarian dan pengurutan langsung.

**Halaman:** Beranda (indikator + grafik) · Penduduk (struktur umur/jenis kelamin, pertumbuhan) · Ekonomi (PDB, pertumbuhan, inflasi, perdagangan) · Sosial (kemiskinan, IPM, pendidikan, kesehatan) · Provinsi (38 provinsi: ibu kota, penduduk, luas, IPM — bisa dicari dan diurutkan) · Sumber & Metode. Setiap angka mencantumkan sumber dan tahunnya (BPS / Bank Dunia).

**Grafik** digambar tangan sebagai SVG (batang, garis, donat) dengan toggle batang/garis. Semua konten tersimpan di file situs sendiri; tidak ada permintaan jaringan apa pun.

**Menjalankan:** `node serve.ts` lalu buka http://localhost:8080 — atau buka `app/index.html` langsung.

**Struktur:** `app/index.html` + `app/style.css` + `app/main.js` + `app/router.js` + `app/views.js` + `app/charts.js` + data per topik (`app/data-*.js`, `app/sources.js`). `main.ts` menyalin `app/` dan `screenshots/` ke direktori output dan menulis `dossier.json` via `vendor/makefun-frontend.ts`.

Entri untuk kompetisi make.fun "Make the best national statistics site" (`best-national-statistics-site-20261126-0539`).
