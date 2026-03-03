import { InvoiceItem, InvoiceItemCalculation } from '../data/interfaces';

export interface TaxCalculationStrategy {
    calculate(item: InvoiceItem): InvoiceItemCalculation;
  }

/**
 * SERVICIO: descuento se aplica ANTES del impuesto
 * base = price * qty
 * discounted = base - (base * discountRate)
 * tax = discounted * taxRate
 * total = discounted + tax
 */
export class ServiceTaxStrategy implements TaxCalculationStrategy {
    calculate(item: InvoiceItem): InvoiceItemCalculation {
      const base = item.price * item.quantity;
      const discount = base * item.discountRate;
      const discounted = base - discount;
      const tax = discounted * item.taxRate;
      const total = discounted + tax;
  
      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        taxRate: item.taxRate,
        discountRate: item.discountRate,
        subtotal: base,
        tax: parseFloat(tax.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      };
    }
  }
  
  /**
   * PRODUCTO: impuesto se calcula sobre precio base, descuento se aplica DESPUÉS
   * base = price * qty
   * tax = base * taxRate
   * subtotal_with_tax = base + tax
   * discount = subtotal_with_tax * discountRate
   * total = subtotal_with_tax - discount
   */
  export class ProductTaxStrategy implements TaxCalculationStrategy {
    calculate(item: InvoiceItem): InvoiceItemCalculation {
      const base = item.price * item.quantity;
      const tax = base * item.taxRate;
      const subtotalWithTax = base + tax;
      const discount = subtotalWithTax * item.discountRate;
      const total = subtotalWithTax - discount;
  
      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        taxRate: item.taxRate,
        discountRate: item.discountRate,
        subtotal: base,
        tax: parseFloat(tax.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      };
    }
  }