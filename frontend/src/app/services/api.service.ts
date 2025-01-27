import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl= 'http://localhost:5000/api';

  constructor(private http:HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetProducts`);
  }


  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/GetProductById/${id}`);
  }

  addProduct(product: any): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/AddProduct`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/UpdateProduct/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DelProducts/${id}`);
  }
}
