import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../models/auth/AuthRequest';
import { Observable, take } from 'rxjs';
import { AuthResponse } from '../models/auth/AuthResponse';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.serviceUrl;
  private readonly tokenKey = 'user-info';

  constructor(protected http: HttpClient) {}

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.API_URL + '/user/login', request)
      .pipe(take(1));
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = localStorage.getItem('user-info');
    return JWT_TOKEN ? true : false;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(): {
    sid: string;
    role: string;
    email: string;
    name: string;
  } | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return {
        sid: decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
        ],
        role: decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
        email:
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
        name: decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ],
      };
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
