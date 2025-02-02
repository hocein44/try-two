import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }
      
  signup(username: string,email:string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username,email,password });
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {  // Check if in browser environment
      localStorage.setItem('authToken', token);
    }
  }
  
  getToken(): string | null {
    if (typeof window !== 'undefined') {  // Check if in browser environment
      return localStorage.getItem('authToken');
    }
    return null;
  }
  
  logout(): void {
    if (typeof window !== 'undefined') {  // Check if in browser environment
      localStorage.removeItem('authToken');
    }
  }
  
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
      return payload.userId;  // Assuming the user ID is stored as 'userId' in the payload
    }
    return null;
  }
}
