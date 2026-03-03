import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { CreateInvoiceDto, InvoiceCalculation } from '../data/interfaces';
const getLocalChromePath = (): string => {
  switch (process.platform) {
    case 'win32':
      return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    case 'darwin':
      return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    default:
      return '/usr/bin/google-chrome';
  }
};

export class PdfService {

    async generatePdf(invoice: CreateInvoiceDto, calculation: InvoiceCalculation): Promise<Buffer> {
        const html = this.buildHtml(invoice, calculation);
        const isProduction = process.env.NODE_ENV === 'production';

        const browser = await puppeteer.launch({
          args: [
            ...chromium.args,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--single-process'
          ],
          executablePath: isProduction
            ? await chromium.executablePath()
            : getLocalChromePath(),
          headless: true
        });

        try {
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
            });
            return Buffer.from(pdf);
        } finally {
            await browser.close();
        }
    }
      private formatCurrency(amount: number, currency: string): string {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(amount);
      }

      private buildHtml(invoice: CreateInvoiceDto, calc: InvoiceCalculation): string {
        const fmt = (n: number) => this.formatCurrency(n, invoice.currency);
        const itemsRows = calc.items.map(item => `
          <tr>
            <td>${item.name}</td>
            <td style="text-align:center">${item.quantity}</td>
            <td style="text-align:right">${fmt(item.unitPrice)}</td>
            <td style="text-align:center">${(item.taxRate * 100).toFixed(0)}%</td>
            <td style="text-align:center">${(item.discountRate * 100).toFixed(0)}%</td>
            <td style="text-align:right">${fmt(item.total)}</td>
          </tr>
        `).join('');
    
        return `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                    <meta charset="UTF-8">
                    </head>
                    <body>
                    <div class="header">
                        <div>
                        <h1>FACTURA</h1>
                        <p style="opacity:0.7; margin-top:4px">${invoice.fromName}</p>
                        </div>
                        <div class="invoice-meta">
                        </div>
                    </div>
                    
                    <p class="section-title">Ítems de Factura</p>
                    <table>
                        <thead>
                        <tr>
                            <th>Descripción</th>
                            <th style="text-align:center">Cant.</th>
                            <th style="text-align:right">Precio Unit.</th>
                            <th style="text-align:center">IVA</th>
                            <th style="text-align:center">Desc.</th>
                            <th style="text-align:right">Total</th>
                        </tr>
                        </thead>
                        <tbody>${itemsRows}</tbody>
                    </table>
                    
                    <div class="totals">
                        <div class="totals-box">
                        <div class="totals-row"><span>Subtotal</span><span>${fmt(calc.subtotal)}</span></div>
                        <div class="totals-row"><span>IVA</span><span>${fmt(calc.totalTax)}</span></div>
                        <div class="totals-row"><span>Descuentos</span><span>-${fmt(calc.totalDiscount)}</span></div>
                        <div class="totals-row total"><span>TOTAL</span><span>${fmt(calc.total)}</span></div>
                        </div>
                    </div>
                    </body>
                    </html>`;
      }
    }