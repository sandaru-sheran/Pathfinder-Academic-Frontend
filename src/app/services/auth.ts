import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../models/register-request';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/user'; 

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap(token => {
          // When Spring returns the JWT, save it to the browser's Local Storage
          localStorage.setItem('jwt_token', token);
        })
      );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Decode the token to read the JSON inside
  getDecodedToken(): any {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Split the token by the dot and grab the middle section [1]
      const payload = token.split('.')[1];
      // atob() is a built-in browser function that decodes Base64 strings
      const decodedPayload = window.atob(payload);
      // Convert the raw string back into a usable JavaScript object
      return JSON.parse(decodedPayload);
    }
    return null;
  }

  // Extract just the role
  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    console.log('Decoded token:', decodedToken);
    if (decodedToken) {
      if (decodedToken.role) {
        return decodedToken.role;
      }
      if (decodedToken.roles && Array.isArray(decodedToken.roles)) {
        return decodedToken.roles[0];
      }
      if (decodedToken.authorities && Array.isArray(decodedToken.authorities)) {
        return decodedToken.authorities[0];
      }
    }
    return null; 
  }

  // Simple check if a token exists at all
  isLoggedIn(): boolean {
    return localStorage.getItem('jwt_token') !== null;
  }
}