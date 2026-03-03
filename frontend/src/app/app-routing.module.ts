import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RenderMode, ServerRoute} from '@angular/ssr';
import { FacturasComponent } from './pages/facturas/facturas.component';

const routes: Routes = [
  {
    path: 'facturas',
    component: FacturasComponent,
    
  },
  {
    path: '**',
    redirectTo: 'facturas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
