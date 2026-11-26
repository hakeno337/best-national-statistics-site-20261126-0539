// Hash router. Routes map to the views in views.js; unknown hashes fall back
// to the Overview. The active nav link is highlighted on every navigation.

import { viewOverview, bindOverview, viewPopulation, bindPopulation, viewEconomy, bindEconomy, viewSocial, viewProvinces, bindProvinces, viewSources } from './views.js';

export const ROUTES = {
  '': { title: 'Beranda', render: viewOverview, bind: bindOverview },
  'penduduk': { title: 'Penduduk', render: viewPopulation, bind: bindPopulation },
  'ekonomi': { title: 'Ekonomi', render: viewEconomy, bind: bindEconomy },
  'sosial': { title: 'Sosial', render: viewSocial, bind: null },
  'provinsi': { title: 'Provinsi', render: viewProvinces, bind: bindProvinces },
  'sumber': { title: 'Sumber & Metode', render: viewSources, bind: null },
};

export function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  return ROUTES[path] ? path : '';
}

export function renderRoute() {
  const key = currentRoute();
  const route = ROUTES[key];
  const app = document.getElementById('app');
  app.innerHTML = route.render();
  document.title = `DataNusa — ${route.title} | Statistik Indonesia`;
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === (key === '' ? 'overview' : key));
  });
  if (route.bind) route.bind();
  window.scrollTo(0, 0);
}
