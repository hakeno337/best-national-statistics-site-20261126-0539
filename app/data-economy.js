// Economy data for Indonesia. All headline figures are published BPS figures
// (Statistik Indonesia 2024, Berita Resmi Statistik 2024–2025).

export const ECONOMY = {
  gdpTrillionRupiah: 22139, // nominal GDP 2024, Rp trillion
  gdpGrowth2024: 5.03,
  gdpPerCapitaUsd: 4960,
  inflation2024: 1.57,
  exportsUsdBillion: 264.7,
  importsUsdBillion: 233.7,
  tradeSurplusUsdBillion: 31.0,
  source: 'BPS, Statistik Indonesia 2024 dan Berita Resmi Statistik 2025',
};

// Real GDP growth, percent per year (constant 2010 prices), BPS.
export const GDP_GROWTH = [
  { year: 2019, percent: 5.02 },
  { year: 2020, percent: -2.07 },
  { year: 2021, percent: 3.70 },
  { year: 2022, percent: 5.31 },
  { year: 2023, percent: 5.05 },
  { year: 2024, percent: 5.03 },
];

// Annual inflation (CPI, December on December), percent, BPS.
export const INFLATION = [
  { year: 2019, percent: 2.72 },
  { year: 2020, percent: 1.68 },
  { year: 2021, percent: 1.87 },
  { year: 2022, percent: 5.51 },
  { year: 2023, percent: 2.61 },
  { year: 2024, percent: 1.57 },
];

// GDP by main sector, share of nominal GDP 2024 (percent), BPS.
export const GDP_SECTORS = [
  { sector: 'Industri pengolahan', percent: 18.9 },
  { sector: 'Perdagangan', percent: 13.0 },
  { sector: 'Pertanian, kehutanan, perikanan', percent: 12.5 },
  { sector: 'Pertambangan', percent: 9.6 },
  { sector: 'Konstruksi', percent: 9.4 },
  { sector: 'Lainnya', percent: 36.6 },
];

// Merchandise trade, billion US dollars, BPS.
export const TRADE = [
  { year: 2019, exports: 167.7, imports: 171.3 },
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.6, imports: 196.2 },
  { year: 2022, exports: 291.9, imports: 237.4 },
  { year: 2023, exports: 258.8, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 },
];

// Main export commodities, share of total exports 2024 (percent), BPS.
export const TOP_EXPORTS = [
  { item: 'Batu bara', percent: 14.5 },
  { item: 'Minyak kelapa sawit (CPO & turunannya)', percent: 12.8 },
  { item: 'Besi dan baja', percent: 11.3 },
  { item: 'Nikel dan barang daripadanya', percent: 5.1 },
  { item: 'Perhiasan & permata', percent: 3.6 },
  { item: 'Lainnya', percent: 52.7 },
];
