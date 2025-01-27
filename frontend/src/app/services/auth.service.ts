import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl= 'http://localhost:5000/api';

  constructor(private http:HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // Signup method
  signup(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, password }, {
      headers: { 'Content-Type': 'application/json' }  // ✅ Ensure JSON request
    });
  }
  
}
