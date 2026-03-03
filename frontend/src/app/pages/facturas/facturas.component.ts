import { Component,Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-facturas',
  standalone: false,
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object| any
  ) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      console.log('--- ESTO SE EJECUTA EN EL SERVIDOR ---');
    } else {
      console.log('--- ESTO SE EJECUTA EN EL NAVEGADOR ---');
    }
  }
}
