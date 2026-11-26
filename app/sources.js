// Sources and method notes for DataNusa. Every figure on the site traces to
// one of these publications; each page repeats the short source line.

export const SOURCES = [
  {
    name: 'Badan Pusat Statistik (BPS) — Statistik Indonesia 2024',
    covers: 'Penduduk pertengahan 2024 (281,6 juta jiwa), luas wilayah, PDB nominal Rp22.139 triliun, PDB per kapita, ekspor dan impor 2024.',
  },
  {
    name: 'BPS — Berita Resmi Statistik 2024–2025',
    covers: 'Pertumbuhan ekonomi 5,03% (2024), inflasi 1,57% (2024), kemiskinan 9,03% (Maret 2024), pengangguran terbuka 4,91% (Agustus 2024), rasio gini 0,379 (Maret 2024).',
  },
  {
    name: 'BPS — Indeks Pembangunan Manusia 2024',
    covers: 'IPM nasional 75,02 dan IPM tiap provinsi; harapan hidup 73,93 tahun; rata-rata lama sekolah 9,19 tahun; harapan lama sekolah 13,21 tahun.',
  },
  {
    name: 'BPS — Sensus Penduduk 2020 dan proyeksi penduduk',
    covers: 'Jumlah penduduk sensus 1971–2020, komposisi laki-laki dan perempuan, struktur umur, dan pangsa penduduk perkotaan.',
  },
  {
    name: 'Bank Dunia (World Bank) — World Development Indicators',
    covers: 'Perbandingan internasional: PDB per kapita dan indikator pembangunan Indonesia terhadap negara tetangga.',
  },
];

export const METHOD_NOTES = [
  'Semua angka dibulatkan agar mudah dibaca: penduduk ke satu desimal (juta jiwa), IPM ke satu desimal, persen ke dua desimal. Pembulatan dapat membuat jumlah rincian berbeda sedikit dari totalnya.',
  'Angka per kelompok umur adalah perkiraan yang dibulatkan dan konsisten dengan total 281,6 juta jiwa; angka ini diberi label “perkiraan” di halaman Penduduk.',
  'Angka provinsi adalah estimasi pertengahan 2024 BPS yang dibulatkan. Empat provinsi di Papua (Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya) dibentuk pada 2022, sehingga deret historisnya pendek.',
  'Pertumbuhan ekonomi dihitung dari PDB harga konstan 2010. Inflasi tahunan dihitung dari Indeks Harga Konsumen Desember terhadap Desember tahun sebelumnya.',
  'DataNusa bukan situs resmi BPS dan tidak berafiliasi dengan BPS atau Bank Dunia. Angka yang ditampilkan adalah ringkasan dari publikasi mereka, bukan data mentah.',
];
