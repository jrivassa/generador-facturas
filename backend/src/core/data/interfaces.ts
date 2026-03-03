export type ItemType = 'producto' | 'servicio';

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ItemType;
}

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ItemType;
  quantity: number;
  taxRate: number;       //16%
  discountRate: number;  //0
}

export interface InvoiceCalculation {
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  total: number;
  items: InvoiceItemCalculation[];
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
export interface CreateInvoiceDto {
  fromName: string;
  items: InvoiceItem[];
  currency: string;
}

export interface InvoiceResponse {
  invoiceNumber: string;
  calculation: InvoiceCalculation;
  pdfUrl: string;
}