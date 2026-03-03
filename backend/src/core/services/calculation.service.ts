import { InvoiceItem, InvoiceCalculation } from '../data/interfaces';
import{ TaxCalculationStrategy, ServiceTaxStrategy, ProductTaxStrategy } from './taxCalculationStrategy';

export class CalculationService {
    private getStrategy(type: string): TaxCalculationStrategy {
      return type === 'servicio' ? new ServiceTaxStrategy() : new ProductTaxStrategy();
    }
    calculate(items: InvoiceItem[]): InvoiceCalculation {
      const itemCalcs = items.map(item => {
        const strategy = this.getStrategy(item.type);
        return strategy.calculate(item);
      });
  
      const subtotal = parseFloat(itemCalcs.reduce((a, i) => a + i.subtotal, 0).toFixed(2));
      const totalTax = parseFloat(itemCalcs.reduce((a, i) => a + i.tax, 0).toFixed(2));
      const totalDiscount = parseFloat(itemCalcs.reduce((a, i) => a + i.discount, 0).toFixed(2));
      const total = parseFloat(itemCalcs.reduce((a, i) => a + i.total, 0).toFixed(2));
  
      return { subtotal, totalTax, totalDiscount, total, items: itemCalcs };
    }
  }