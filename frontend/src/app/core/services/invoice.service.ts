import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatalogItem, GenerateResponse, InvoiceForm, InvoiceCalculation } from '../interfaces/models';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrlBase;

    getCatalog(): Observable<{ success: boolean; data: CatalogItem[] }> {
      return this.http.get<any>(`${this.base}${environment.apiCatalog}`);
    }

    calculate(form: InvoiceForm): Observable<{ success: boolean; data: { calculation: InvoiceCalculation } }> {
      return this.http.post<any>(`${this.base}${environment.apiCalculate}`, form);
    }

    generateInvoice(form: InvoiceForm): Observable<GenerateResponse> {
      return this.http.post<GenerateResponse>(`${this.base}${environment.apiGenerate}`, form);
    }
}
