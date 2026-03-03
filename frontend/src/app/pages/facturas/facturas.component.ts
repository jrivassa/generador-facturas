import { Component, OnInit, signal, computed, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../core/services/invoice.service';
import { CalculationService } from '../../core/services/calculation.service';
import {  CatalogItem, InvoiceItem, InvoiceCalculation } from '../../core/interfaces/models';


@Component({
  selector: 'app-facturas',
  standalone: false,
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit {

  private api = inject(InvoiceService);
  private calcService = inject(CalculationService);
  catalog = signal<CatalogItem[]>([]);
  items = signal<InvoiceItem[]>([]);
  mixedTypeError = signal(false);
  loading = signal(false);
  pdfUrl = signal<string | null>(null);
  error = signal<string | null>(null);
  fromName = signal('');
  currency = signal('MXN');

  calculation = computed<InvoiceCalculation>(() => this.calcService.calculateAll(this.items()));

  products = computed(() => (this.catalog() ?? []).filter(c => c.type === 'producto'));
  services = computed(() => (this.catalog() ?? []).filter(c => c.type === 'servicio'));

  currentTypes = computed(() => new Set(this.items().map(i => i.type)));
  ngOnInit(): void {
   this.api.getCatalog().subscribe((res: any) => {    
    this.catalog.set(Array.isArray(res) ? res : res.data ?? []);
  });
  }
  addItem(catalogItem: CatalogItem) {
    const types = this.currentTypes();
    if (types.size > 0 && !types.has(catalogItem.type)) {
      this.mixedTypeError.set(true);
      setTimeout(() => this.mixedTypeError.set(false), 4000);
      return;
    }
    this.mixedTypeError.set(false);

    const exists = this.items().find(i => i.id === catalogItem.id);
    if (exists) {
      this.items.update(items => items.map(i =>
        i.id === catalogItem.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items.update(items => [...items, {
        ...catalogItem,
        quantity: 1,
        taxRate: 0.16,
        discountRate: 0
      }]);
    }
  }

  removeItem(id: string) {
    this.items.update(items => items.filter(i => i.id !== id));
  }

  updateItem(id: string, field: keyof InvoiceItem, value: number) {
    this.items.update(items => items.map(i =>
      i.id === id ? { ...i, [field]: value } : i
    ));
  }

 
}
