// Page views for DataNusa. Each view returns HTML for one hash route and,
// where the page has working controls, a bind() that wires them up after the
// HTML is in the document. All figures come from the data-* modules.

import { HEADLINE, AT_A_GLANCE } from './data-indicators.js';
import { POPULATION, AGE_GROUPS, AGE_BANDS, POPULATION_HISTORY, TOP_PROVINCES } from './data-population.js';
import { ECONOMY, GDP_GROWTH, INFLATION, GDP_SECTORS, TRADE, TOP_EXPORTS } from './data-economy.js';
import { SOCIAL, POVERTY_SERIES, UNEMPLOYMENT_SERIES, IPM_SERIES, IPM_EXTREMES } from './data-social.js';
import { PROVINCES, PROVINCES_SOURCE } from './data-provinces.js';
import { SOURCES, METHOD_NOTES } from './sources.js';
import { barChart, lineChart, hbarChart, donutChart } from './charts.js';

const fmtID = (n, decimals = 2) => n.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function sourceLine(text) {
  return `<p class="src"><b>Sumber:</b> ${text}</p>`;
}

function cardsHTML(items) {
  return `<div class="cards">${items.map((c) => `
    <a class="card card-link" href="${c.link}">
      <div class="label">${c.label}</div>
      <div class="value">${c.value} <small>${c.unit}</small></div>
      <p class="note">${c.note}</p>
      <p class="note"><span class="${c.deltaClass}">${c.delta}</span></p>
      <span class="more">${c.linkText}</span>
    </a>`).join('')}
  </div>`;
}

// ---------- Overview ----------
export function viewOverview() {
  return `
  <section class="hero">
    <h1>Indonesia dalam angka</h1>
    <p>281,6 juta penduduk di 38 provinsi dan 17.380 pulau — ekonomi terbesar di Asia Tenggara, tumbuh 5,03% pada 2024. DataNusa merangkum angka-angka kuncinya, lengkap dengan sumber dan tahun.</p>
    <p class="hero-meta">Angka utama: BPS 2024 · Diperbarui dari publikasi Statistik Indonesia 2024</p>
  </section>
  ${cardsHTML(HEADLINE)}
  <div class="grid-2">
    <section class="panel">
      <h3>Pertumbuhan ekonomi 2019–2024</h3>
      <div class="toggle-row" role="group" aria-label="Jenis diagram">
        <button class="toggle" data-chart="growth" data-kind="bar" aria-pressed="true">Batang</button>
        <button class="toggle" data-chart="growth" data-kind="line" aria-pressed="false">Garis</button>
      </div>
      <div id="growth-chart">${barChart(GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.percent })), { format: (v) => fmtID(v) + '%', yLabel: 'PDB, % per tahun' })}</div>
      <p>Ekonomi terkontraksi 2,07% pada 2020 saat pandemi, lalu pulih di atas 5% selama tiga tahun berturut-turut.</p>
      ${sourceLine('BPS, pertumbuhan PDB harga konstan 2010, 2019–2024.')}
    </section>
    <section class="panel">
      <h3>Sekilas Indonesia</h3>
      <ul class="fact-list">
        ${AT_A_GLANCE.map((f) => `<li><span>${f.fact}</span><strong>${f.value}</strong></li>`).join('')}
      </ul>
      ${sourceLine('BPS 2024; pangsa perkotaan dan jumlah pulau dari BPS dan Kementerian Kelautan dan Perikanan.')}
      <div class="callout"><p><strong>Mulai dari mana?</strong> Cari angka penduduk di <a href="#/penduduk">Penduduk</a>, angka ekonomi di <a href="#/ekonomi">Ekonomi</a>, kemiskinan dan IPM di <a href="#/sosial">Sosial</a>, atau bandingkan provinsi di <a href="#/provinsi">Provinsi</a>.</p></div>
    </section>
  </div>`;
}

export function bindOverview() {
  const growth = GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.percent }));
  document.querySelectorAll('[data-chart="growth"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-chart="growth"]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const host = document.getElementById('growth-chart');
      host.innerHTML = btn.dataset.kind === 'line'
        ? lineChart(growth, { format: (v) => fmtID(v) + '%', yLabel: 'PDB, % per tahun' })
        : barChart(growth, { format: (v) => fmtID(v) + '%', yLabel: 'PDB, % per tahun' });
    });
  });
}

// ---------- Population ----------
export function viewPopulation() {
  return `
  <h1>Penduduk</h1>
  <p class="lede">Indonesia berpenduduk 281,6 juta jiwa pada pertengahan 2024 — negara keempat terpadat di dunia. Dua dari tiga penduduk berusia kerja, dan lebih dari separuh tinggal di Pulau Jawa.</p>
  <div class="cards">
    <div class="card"><div class="label">Penduduk</div><div class="value">281,6 <small>juta</small></div><p class="note">Pertengahan 2024</p></div>
    <div class="card"><div class="label">Laki-laki / perempuan</div><div class="value">141,2 <small>/ 140,4 jt</small></div><p class="note">Rasio jenis kelamin 100,6</p></div>
    <div class="card"><div class="label">Usia median</div><div class="value">31,1 <small>tahun</small></div><p class="note">Separuh penduduk lebih muda dari ini</p></div>
    <div class="card"><div class="label">Tinggal di kota</div><div class="value">59,3 <small>%</small></div><p class="note">Pangsa penduduk perkotaan, 2024</p></div>
  </div>
  ${sourceLine('BPS, Statistik Indonesia 2024 dan proyeksi penduduk pertengahan 2024.')}
  <div class="grid-2">
    <section class="panel">
      <h3>Pertumbuhan penduduk, 1971–2024</h3>
      ${lineChart(POPULATION_HISTORY.map((d) => ({ label: String(d.year), value: d.millions })), { format: (v) => Math.round(v) + ' jt', yLabel: 'Juta jiwa' })}
      <p>Penduduk bertambah 2,5 kali lipat sejak 1971, tetapi laju tumbuhnya melambat: dari sekitar 2% per tahun pada 1970-an menjadi 0,79% pada 2024.</p>
      ${sourceLine('BPS, Sensus Penduduk 1971–2020 dan estimasi pertengahan 2024.')}
    </section>
    <section class="panel">
      <h3>Kelompok umur</h3>
      ${donutChart(AGE_BANDS.map((b) => ({ label: b.band, value: b.percent })), { format: (v) => fmtID(v, 1) + '%' })}
      <p>Indonesia masih menikmati bonus demografi: 192,8 juta jiwa (68,4%) berada pada usia kerja 15–64 tahun.</p>
      ${sourceLine('BPS 2024; pangsa dihitung dari proyeksi penduduk.')}
    </section>
  </div>
  <section class="panel">
    <h3>Penduduk menurut kelompok umur lima tahunan</h3>
    <div class="toggle-row" role="group" aria-label="Jenis diagram">
      <button class="toggle" data-chart="age" data-kind="bar" aria-pressed="true">Batang</button>
      <button class="toggle" data-chart="age" data-kind="line" aria-pressed="false">Garis</button>
    </div>
    <div id="age-chart">${barChart(AGE_GROUPS.map((d) => ({ label: d.group, value: d.millions })), { format: (v) => fmtID(v, 1), yLabel: 'Juta jiwa' })}</div>
    <p>Kelompok terbesar adalah usia 25–29 tahun (23,0 juta jiwa). Kelompok 75 tahun ke atas adalah yang terkecil (5,6 juta jiwa).</p>
    ${sourceLine('BPS 2024 — perkiraan yang dibulatkan, konsisten dengan total 281,6 juta jiwa.')}
  </section>
  <section class="panel">
    <h3>Lima provinsi terpadat</h3>
    ${hbarChart(TOP_PROVINCES.map((p) => ({ label: p.name, value: p.millions })), { format: (v) => fmtID(v, 1) + ' jt' })}
    <p>Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, dan Jawa Tengah — menampung 129,6 juta jiwa, atau 46% seluruh penduduk Indonesia.</p>
    ${sourceLine('BPS, estimasi penduduk provinsi pertengahan 2024.')}
  </section>`;
}

export function bindPopulation() {
  const age = AGE_GROUPS.map((d) => ({ label: d.group, value: d.millions }));
  document.querySelectorAll('[data-chart="age"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-chart="age"]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      document.getElementById('age-chart').innerHTML = btn.dataset.kind === 'line'
        ? lineChart(age, { format: (v) => fmtID(v, 1), yLabel: 'Juta jiwa' })
        : barChart(age, { format: (v) => fmtID(v, 1), yLabel: 'Juta jiwa' });
    });
  });
}

// ---------- Economy ----------
export function viewEconomy() {
  return `
  <h1>Ekonomi</h1>
  <p class="lede">PDB Indonesia mencapai Rp22.139 triliun pada 2024 — sekitar US$1,4 triliun — dengan pertumbuhan 5,03% dan inflasi yang mereda ke 1,57%. Perdagangan barang mencatat surplus 31,0 miliar dolar AS.</p>
  <div class="cards">
    <div class="card"><div class="label">PDB nominal</div><div class="value">Rp22.139 <small>triliun</small></div><p class="note">2024 · ±US$1,4 triliun</p></div>
    <div class="card"><div class="label">Pertumbuhan PDB</div><div class="value">5,03 <small>%</small></div><p class="note">2024, harga konstan 2010</p></div>
    <div class="card"><div class="label">PDB per kapita</div><div class="value">US$4.960</div><p class="note">2024</p></div>
    <div class="card"><div class="label">Inflasi</div><div class="value">1,57 <small>%</small></div><p class="note">Des 2024 terhadap Des 2023</p></div>
  </div>
  ${sourceLine('BPS, Statistik Indonesia 2024 dan Berita Resmi Statistik 2025.')}
  <div class="grid-2">
    <section class="panel">
      <h3>Pertumbuhan PDB, 2019–2024</h3>
      ${barChart(GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.percent })), { format: (v) => fmtID(v) + '%', yLabel: '% per tahun' })}
      <p>Setelah kontraksi 2020, pertumbuhan kembali ke kisaran 5% dan bertahan di sana selama 2022–2024.</p>
      ${sourceLine('BPS, PDB harga konstan 2010.')}
    </section>
    <section class="panel">
      <h3>Inflasi tahunan, 2019–2024</h3>
      ${lineChart(INFLATION.map((d) => ({ label: String(d.year), value: d.percent })), { format: (v) => fmtID(v) + '%', yLabel: '% (IHK, Des ke Des)', colorClass: 'amber' })}
      <p>Inflasi melonjak ke 5,51% pada 2022 saat harga energi naik, lalu turun ke 1,57% pada 2024 — terendah dalam enam tahun ini.</p>
      ${sourceLine('BPS, Indeks Harga Konsumen.')}
    </section>
  </div>
  <div class="grid-2">
    <section class="panel">
      <h3>PDB menurut lapangan usaha, 2024</h3>
      ${donutChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.percent })), { format: (v) => fmtID(v, 1) + '%' })}
      ${sourceLine('BPS, PDB harga berlaku 2024 menurut lapangan usaha.')}
    </section>
    <section class="panel">
      <h3>Perdagangan barang, 2019–2024</h3>
      <div class="toggle-row" role="group" aria-label="Tampilan perdagangan">
        <button class="toggle" data-chart="trade" data-kind="bar" aria-pressed="true">Batang</button>
        <button class="toggle" data-chart="trade" data-kind="line" aria-pressed="false">Garis</button>
      </div>
      <div id="trade-chart">${barChart(TRADE.map((d) => ({ label: String(d.year), value: d.exports })), { format: (v) => Math.round(v) + '', yLabel: 'Ekspor, miliar US$' })}</div>
      <p>Ekspor 2024 sebesar 264,7 miliar dolar AS dan impor 233,7 miliar dolar AS — surplus 31,0 miliar dolar AS, tahun ketiga berturut-turut surplus di atas 30 miliar dolar AS.</p>
      ${sourceLine('BPS, statistik perdagangan luar negeri 2019–2024.')}
    </section>
  </div>
  <section class="panel">
    <h3>Komoditas ekspor utama, 2024</h3>
    ${hbarChart(TOP_EXPORTS.map((e) => ({ label: e.item, value: e.percent })), { format: (v) => fmtID(v, 1) + '%' })}
    ${sourceLine('BPS, pangsa nilai ekspor menurut komoditas, 2024.')}
  </section>`;
}

export function bindEconomy() {
  const trade = TRADE.map((d) => ({ label: String(d.year), value: d.exports }));
  document.querySelectorAll('[data-chart="trade"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-chart="trade"]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      document.getElementById('trade-chart').innerHTML = btn.dataset.kind === 'line'
        ? lineChart(trade, { format: (v) => Math.round(v) + '', yLabel: 'Ekspor, miliar US$', colorClass: 'amber' })
        : barChart(trade, { format: (v) => Math.round(v) + '', yLabel: 'Ekspor, miliar US$' });
    });
  });
}

// ---------- Social ----------
export function viewSocial() {
  return `
  <h1>Sosial</h1>
  <p class="lede">Kemiskinan turun ke 9,03% pada Maret 2024 — 25,22 juta jiwa — dan Indeks Pembangunan Manusia mencapai 75,02. Di balik rata-rata nasional, kesenjangan antarprovinsi masih lebar: IPM tertinggi 84,2, terendah 58,0.</p>
  <div class="cards">
    <div class="card"><div class="label">Kemiskinan</div><div class="value">9,03 <small>%</small></div><p class="note">Maret 2024 · 25,22 juta jiwa</p></div>
    <div class="card"><div class="label">IPM</div><div class="value">75,02</div><p class="note">2024 · kategori “tinggi”</p></div>
    <div class="card"><div class="label">Pengangguran terbuka</div><div class="value">4,91 <small>%</small></div><p class="note">Agustus 2024</p></div>
    <div class="card"><div class="label">Harapan hidup</div><div class="value">73,93 <small>tahun</small></div><p class="note">2024</p></div>
  </div>
  ${sourceLine('BPS, Berita Resmi Statistik 2024 dan Indeks Pembangunan Manusia 2024.')}
  <div class="grid-2">
    <section class="panel">
      <h3>Kemiskinan, 2019–2024</h3>
      ${lineChart(POVERTY_SERIES.map((d) => ({ label: String(d.year), value: d.percent })), { format: (v) => fmtID(v) + '%', yLabel: '% penduduk' })}
      <p>Kemiskinan melonjak di atas 10% pada 2021 saat pandemi, lalu turun tiga tahun berturut-turut hingga 9,03% — terendah dalam satu dekade. Kemiskinan desa (11,79%) masih jauh di atas kota (7,41%).</p>
      ${sourceLine('BPS, tingkat kemiskinan Maret setiap tahun.')}
    </section>
    <section class="panel">
      <h3>Pengangguran terbuka, 2019–2024</h3>
      ${barChart(UNEMPLOYMENT_SERIES.map((d) => ({ label: String(d.year), value: d.percent })), { format: (v) => fmtID(v) + '%', yLabel: '% angkatan kerja' })}
      <p>Pengangguran sempat 7,07% pada Agustus 2020, lalu turun setiap tahun hingga 4,91% pada Agustus 2024.</p>
      ${sourceLine('BPS, tingkat pengangguran terbuka Agustus setiap tahun.')}
    </section>
  </div>
  <div class="grid-2">
    <section class="panel">
      <h3>IPM, 2019–2024</h3>
      ${lineChart(IPM_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => fmtID(v), yLabel: 'IPM' })}
      <p>IPM naik 3,10 poin dalam lima tahun. Kenaikan tercepat terjadi pada 2023–2024, didorong harapan lama sekolah dan pengeluaran per kapita.</p>
      ${sourceLine('BPS, Indeks Pembangunan Manusia 2019–2024.')}
    </section>
    <section class="panel">
      <h3>IPM provinsi: tertinggi dan terendah, 2024</h3>
      ${hbarChart(IPM_EXTREMES.map((p) => ({ label: p.name + (p.note ? ' · ' + p.note : ''), value: p.value })), { format: (v) => fmtID(v, 1), maxValue: 100 })}
      <p>Selisih 26,2 poin antara DKI Jakarta (84,2) dan Papua Pegunungan (58,0) adalah kesenjangan pembangunan terbesar di Indonesia.</p>
      ${sourceLine('BPS, Indeks Pembangunan Manusia provinsi 2024.')}
      <h3>Pendidikan &amp; kesehatan</h3>
      <ul class="fact-list">
        <li><span>Rata-rata lama sekolah</span><strong>9,19 tahun (2024)</strong></li>
        <li><span>Harapan lama sekolah</span><strong>13,21 tahun (2024)</strong></li>
        <li><span>Melek huruf usia 15+</span><strong>98,9% (2024)</strong></li>
        <li><span>Rasio gini</span><strong>0,379 (Maret 2024)</strong></li>
      </ul>
      ${sourceLine('BPS, Statistik Indonesia 2024.')}
    </section>
  </div>`;
}

// ---------- Provinces ----------
let provinceState = { query: '', sortKey: 'population', sortDir: -1 };

function provinceRows() {
  const q = provinceState.query.trim().toLowerCase();
  let rows = PROVINCES.filter((p) =>
    !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const key = provinceState.sortKey;
  const dir = provinceState.sortDir;
  rows = rows.slice().sort((a, b) => {
    if (typeof a[key] === 'string') return dir * a[key].localeCompare(b[key], 'id');
    return dir * (a[key] - b[key]);
  });
  return rows;
}

function provinceTableHTML() {
  const rows = provinceRows();
  const arrow = (key) => provinceState.sortKey === key ? (provinceState.sortDir === 1 ? ' ▲' : ' ▼') : '';
  const head = (key, label, num = false) =>
    `<th${num ? ' class="num"' : ''}><button type="button" data-sort="${key}">${label}<span class="arrow">${arrow(key)}</span></button></th>`;
  return `
  <div class="table-wrap">
    <table class="data" id="province-table">
      <thead><tr>
        ${head('name', 'Provinsi')}
        ${head('capital', 'Ibu kota')}
        ${head('population', 'Penduduk (jt)', true)}
        ${head('area', 'Luas (rb km²)', true)}
        ${head('ipm', 'IPM 2024', true)}
      </tr></thead>
      <tbody>
        ${rows.map((p) => `<tr><td><strong>${p.name}</strong></td><td>${p.capital}</td><td class="num">${fmtID(p.population, 1)}</td><td class="num">${fmtID(p.area, 1)}</td><td class="num">${fmtID(p.ipm, 1)}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
  <p class="result-count" id="province-count">${rows.length} dari 38 provinsi ditampilkan.</p>`;
}

export function viewProvinces() {
  const totalPop = PROVINCES.reduce((s, p) => s + p.population, 0);
  return `
  <h1>Provinsi</h1>
  <p class="lede">Jelajahi 38 provinsi Indonesia: cari berdasarkan nama atau ibu kota, lalu urutkan menurut penduduk, luas, atau IPM. Jawa Barat adalah provinsi terpadat (49,9 juta jiwa); Papua adalah yang terluas (319 ribu km²).</p>
  <div class="cards">
    <div class="card"><div class="label">Provinsi</div><div class="value">38</div><p class="note">Termasuk 4 provinsi baru di Papua (2022)</p></div>
    <div class="card"><div class="label">Total penduduk</div><div class="value">${fmtID(totalPop, 1)} <small>juta</small></div><p class="note">Jumlah angka provinsi yang dibulatkan; total nasional BPS 281,6 juta</p></div>
    <div class="card"><div class="label">IPM tertinggi</div><div class="value">84,2</div><p class="note">DKI Jakarta, 2024</p></div>
    <div class="card"><div class="label">IPM terendah</div><div class="value">58,0</div><p class="note">Papua Pegunungan, 2024</p></div>
  </div>
  <section class="panel">
    <h3>Penjelajah provinsi</h3>
    <div class="search-row">
      <label for="province-search">Cari provinsi atau ibu kota</label>
      <input type="search" id="province-search" placeholder="Misalnya: Jawa, Makassar, Kupang…" value="${provinceState.query}">
    </div>
    <div id="province-table-host">${provinceTableHTML()}</div>
    ${sourceLine(PROVINCES_SOURCE)}
  </section>
  <section class="panel">
    <h3>Sepuluh provinsi terpadat</h3>
    ${hbarChart(PROVINCES.slice().sort((a, b) => b.population - a.population).slice(0, 10).map((p) => ({ label: p.name, value: p.population })), { format: (v) => fmtID(v, 1) + ' jt' })}
    ${sourceLine('BPS, estimasi penduduk provinsi pertengahan 2024.')}
  </section>`;
}

export function bindProvinces() {
  const search = document.getElementById('province-search');
  const host = document.getElementById('province-table-host');
  const rerender = () => { host.innerHTML = provinceTableHTML(); wireSort(); };
  const wireSort = () => {
    host.querySelectorAll('[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.sort;
        if (provinceState.sortKey === key) provinceState.sortDir *= -1;
        else { provinceState.sortKey = key; provinceState.sortDir = key === 'name' || key === 'capital' ? 1 : -1; }
        rerender();
      });
    });
  };
  search.addEventListener('input', () => { provinceState.query = search.value; rerender(); });
  wireSort();
}

// ---------- Sources ----------
export function viewSources() {
  return `
  <h1>Sumber &amp; Metode</h1>
  <p class="lede">Setiap angka di DataNusa berasal dari publikasi yang tercantum di bawah ini. Halaman ini menjelaskan dari mana angka itu datang dan bagaimana angka itu disajikan.</p>
  <section class="panel">
    <h3>Sumber data</h3>
    <ul>
      ${SOURCES.map((s) => `<li><strong>${s.name}</strong><br>${s.covers}</li>`).join('')}
    </ul>
  </section>
  <section class="panel">
    <h3>Catatan metode</h3>
    <ul>
      ${METHOD_NOTES.map((m) => `<li>${m}</li>`).join('')}
    </ul>
  </section>
  <section class="panel">
    <h3>Cara mengutip DataNusa</h3>
    <p>Contoh: “Penduduk Indonesia 281,6 juta jiwa (BPS, pertengahan 2024) — dikutip dari DataNusa, diakses November 2026.” Selalu kutip sumber asli (BPS atau Bank Dunia) beserta tahunnya, karena DataNusa adalah ringkasan, bukan sumber primer.</p>
    <p class="src"><b>Sumber:</b> halaman ini disusun dari publikasi BPS dan Bank Dunia yang tercantum di atas.</p>
  </section>`;
}
