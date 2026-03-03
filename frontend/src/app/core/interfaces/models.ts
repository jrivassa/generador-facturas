// frontend/src/app/models/invoice.model.ts
export type ItemType = 'producto' | 'servicio';

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ItemType;
}

export interface InvoiceItem extends CatalogItem {
  quantity: number;
  taxRate: number;
  discountRate: number;
}

export interface InvoiceItemCalculation {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountRate: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export interface InvoiceCalculation {
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  total: number;
  items: InvoiceItemCalculation[];
}

export interface InvoiceForm {
  fromName: string;
  items: InvoiceItem[];
  currency: string;
}

export interface GenerateResponse {
  success: boolean;
  data: {
    invoiceNumber: string;
    calculation: InvoiceCalculation;
    pdfUrl: string;
  };
}