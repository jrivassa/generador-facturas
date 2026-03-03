import { Injectable } from '@angular/core';
import { InvoiceItem, InvoiceCalculation, InvoiceItemCalculation } from '../interfaces/models';
@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  
  constructor() { }
  calculateAll(items: InvoiceItem[]): InvoiceCalculation {
    const calcs = items.map(i => this.calculateItem(i));
    return {
      subtotal: +calcs.reduce((a, i) => a + i.subtotal, 0).toFixed(2),
      totalTax: +calcs.reduce((a, i) => a + i.tax, 0).toFixed(2),
      totalDiscount: +calcs.reduce((a, i) => a + i.discount, 0).toFixed(2),
      total: +calcs.reduce((a, i) => a + i.total, 0).toFixed(2),
      items: calcs
    };
  }

  calculateItem(item: InvoiceItem): InvoiceItemCalculation {
    const base = item.price * item.quantity;

    if (item.type === 'servicio') {
      // Descuento antes del impuesto
      const discount = base * item.discountRate;
      const discounted = base - discount;
      const tax = discounted * item.taxRate;
      const total = discounted + tax;
      return { id: item.id, name: item.name, quantity: item.quantity, unitPrice: item.price,
        taxRate: item.taxRate, discountRate: item.discountRate,
        subtotal: base, tax: +tax.toFixed(2), discount: +discount.toFixed(2), total: +total.toFixed(2) };
    } else {
      // Impuesto sobre precio base, descuento después
      const tax = base * item.taxRate;
      const subtotalWithTax = base + tax;
      const discount = subtotalWithTax * item.discountRate;
      const total = subtotalWithTax - discount;
      return { id: item.id, name: item.name, quantity: item.quantity, unitPrice: item.price,
        taxRate: item.taxRate, discountRate: item.discountRate,
        subtotal: base, tax: +tax.toFixed(2), discount: +discount.toFixed(2), total: +total.toFixed(2) };
    }
  }


}
