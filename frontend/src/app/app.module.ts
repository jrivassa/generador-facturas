import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FacturasComponent } from './pages/facturas/facturas.component';

@NgModule({
  declarations: [
    AppComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([])
    ),
    provideClientHydration(withEventReplay()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
