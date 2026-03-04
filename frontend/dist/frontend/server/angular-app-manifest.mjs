
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 2192, hash: '7ff1624b7ad966a1b3539885a447038f2ac97c91d61eee893ae4f1801176b74a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1005, hash: 'e2883137684202a60e4c5e4e741c2ba5e1c2b0302639bb98ffe6f165cf0619ec', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-OPOXX7UU.css': {size: 13086, hash: 'O4RaJfWzi/U', text: () => import('./assets-chunks/styles-OPOXX7UU_css.mjs').then(m => m.default)}
  },
};
