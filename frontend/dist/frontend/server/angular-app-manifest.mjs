
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 2192, hash: '03fa4a75fa8b5f8685fdb837d3581924dfa43d5471b677433205e289caa75115', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1005, hash: '77117eb4d4e7d53c7991f3deebd4e95894678c2b19093e3b47286c1d7e8c7021', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-OPOXX7UU.css': {size: 13086, hash: 'O4RaJfWzi/U', text: () => import('./assets-chunks/styles-OPOXX7UU_css.mjs').then(m => m.default)}
  },
};
