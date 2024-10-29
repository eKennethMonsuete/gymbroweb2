import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../models/auth/AuthRequest';
import { Observable, take } from 'rxjs';
import { AuthResponse } from '../models/auth/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.serviceUrl;

  constructor(protected http: HttpClient) {}

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.API_URL + '/api/user/login', request)
      .pipe(take(1));
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = sessionStorage.getItem('user-info');
    return JWT_TOKEN ? true : false;
  }
}
