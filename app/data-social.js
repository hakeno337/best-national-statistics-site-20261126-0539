// Social indicators for Indonesia. All figures are published BPS figures
// (Statistik Indonesia 2024, Berita Resmi Statistik, Indeks Pembangunan
// Manusia 2024).

export const SOCIAL = {
  povertyPercentMar2024: 9.03,
  povertyUrbanPercent: 7.41,
  povertyRuralPercent: 11.79,
  poorPeopleMillions: 25.22,
  giniMar2024: 0.379,
  unemploymentAug2024: 4.91,
  ipm2024: 75.02,
  lifeExpectancy2024: 73.93,
  meanSchoolingYears: 9.19,
  expectedSchoolingYears: 13.21,
  literacyPercent: 98.9, // population aged 15+, BPS 2024 estimate
  source: 'BPS, Statistik Indonesia 2024 dan Berita Resmi Statistik 2024',
};

// Poverty rate, percent of population, March each year, BPS.
export const POVERTY_SERIES = [
  { year: 2019, percent: 9.22 },
  { year: 2020, percent: 9.78 },
  { year: 2021, percent: 10.14 },
  { year: 2022, percent: 9.54 },
  { year: 2023, percent: 9.36 },
  { year: 2024, percent: 9.03 },
];

// Open unemployment rate, percent of labour force, August each year, BPS.
export const UNEMPLOYMENT_SERIES = [
  { year: 2019, percent: 5.28 },
  { year: 2020, percent: 7.07 },
  { year: 2021, percent: 6.49 },
  { year: 2022, percent: 5.86 },
  { year: 2023, percent: 5.45 },
  { year: 2024, percent: 4.91 },
];

// Human Development Index (IPM), BPS.
export const IPM_SERIES = [
  { year: 2019, value: 71.92 },
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 72.91 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Highest and lowest provincial IPM in 2024 (BPS, rounded to one decimal).
export const IPM_EXTREMES = [
  { name: 'DKI Jakarta', value: 84.2, note: 'tertinggi' },
  { name: 'DI Yogyakarta', value: 81.6, note: '' },
  { name: 'Kalimantan Timur', value: 80.3, note: '' },
  { name: 'Papua Pegunungan', value: 58.0, note: 'terendah' },
  { name: 'Papua Tengah', value: 61.4, note: '' },
  { name: 'Papua', value: 63.0, note: '' },
];
