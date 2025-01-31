import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  createCheckoutSession(items: any[]) {
    return this.http.post<{ id: string }>(`${environment.apiUrl}/api/create-checkout-session`, { items });
  }
}
