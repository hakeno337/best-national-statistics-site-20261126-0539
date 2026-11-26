// Population data for Indonesia. Headline figures are published BPS figures
// (mid-year estimates and census-based projections). Age-group figures are
// rounded estimates consistent with the 281,6 million total; they are labelled
// as estimates wherever shown.

export const POPULATION = {
  totalMillions: 281.6,
  year: 2024,
  growthPercent: 0.79,
  maleMillions: 141.2,
  femaleMillions: 140.4,
  sexRatio: 100.6, // males per 100 females
  densityPerKm2: 148,
  urbanSharePercent: 59.3, // share living in urban areas, BPS 2024 estimate
  medianAge: 31.1,
  source: 'BPS, Statistik Indonesia 2024 dan proyeksi penduduk pertengahan 2024',
};

// Population by 5-year age group, millions of people, 2024 (rounded estimates).
export const AGE_GROUPS = [
  { group: '0–4', millions: 21.0 },
  { group: '5–9', millions: 22.0 },
  { group: '10–14', millions: 22.8 },
  { group: '15–19', millions: 22.6 },
  { group: '20–24', millions: 22.5 },
  { group: '25–29', millions: 23.0 },
  { group: '30–34', millions: 22.6 },
  { group: '35–39', millions: 22.0 },
  { group: '40–44', millions: 20.8 },
  { group: '45–49', millions: 19.0 },
  { group: '50–54', millions: 16.9 },
  { group: '55–59', millions: 14.3 },
  { group: '60–64', millions: 11.1 },
  { group: '65–69', millions: 8.2 },
  { group: '70–74', millions: 5.4 },
  { group: '75+', millions: 5.6 },
];

// Population growth, census years and mid-year estimates (millions), BPS.
export const POPULATION_HISTORY = [
  { year: 1971, millions: 119.2 },
  { year: 1980, millions: 151.9 },
  { year: 1990, millions: 179.4 },
  { year: 2000, millions: 206.3 },
  { year: 2010, millions: 238.5 },
  { year: 2020, millions: 270.2 },
  { year: 2024, millions: 281.6 },
];

// Share of the population by broad age band, 2024 (percent).
export const AGE_BANDS = [
  { band: '0–14 tahun (anak)', percent: 23.4, millions: 65.8 },
  { band: '15–64 tahun (usia kerja)', percent: 68.4, millions: 192.8 },
  { band: '65+ tahun (lansia)', percent: 8.2, millions: 23.0 },
];

// Five most populous provinces (millions, 2024) for the population page.
export const TOP_PROVINCES = [
  { name: 'Jawa Barat', millions: 49.9 },
  { name: 'Jawa Timur', millions: 41.8 },
  { name: 'Jawa Tengah', millions: 37.9 },
  { name: 'Sumatera Utara', millions: 15.6 },
  { name: 'Banten', millions: 12.4 },
];
