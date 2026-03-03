// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'facturas', 
    renderMode: RenderMode.Server
  },
  {
    path: '**', // Cualquier otra ruta que no sea facturas
    renderMode: RenderMode.Server
  }
];