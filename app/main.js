// DataNusa entry point: render the current hash route on load and on every
// hash change. All content is local; the site makes no network requests.

import { renderRoute } from './router.js';

window.addEventListener('hashchange', renderRoute);
renderRoute();
