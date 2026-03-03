import { z } from 'zod';

const invoiceItemSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string(),
    price: z.number().positive(),
    type: z.enum(['producto', 'servicio']),
    quantity: z.number().int().positive(),
    taxRate: z.number().min(0).max(1),
    discountRate: z.number().min(0).max(1)
  });

  export const createInvoiceSchema = z.object({
    fromName: z.string().min(1),
    items: z.array(invoiceItemSchema).min(1),
    currency: z.string().default('MXN')
  }).superRefine((data, ctx) => {
    const types = new Set(data.items.map(i => i.type));
    if (types.has('producto') && types.has('servicio')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'No se pueden mezclar ítems de tipo "Producto" y "Servicio" en una misma factura.',
        path: ['items']
      });
    }
  });