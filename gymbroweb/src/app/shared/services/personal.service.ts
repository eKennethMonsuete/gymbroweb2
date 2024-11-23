import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { PersonalInput } from '../models/personal/personalInput';
import { Observable } from 'rxjs';
import { PersonalResponse } from '../models/personal/personalResponse';
import { PersonalFindByIdResponse } from '../models/personal/personalFindByIdResponse';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private API_URL = environment.serviceUrl;
  private JWT_TOKEN = sessionStorage.getItem('user-info');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createPersonal(request: PersonalInput): Observable<PersonalResponse> {
    return this.http.post<PersonalResponse>(
      `${this.API_URL}/personal`,
      request
    );
  }

  listPersonalStudents(id: string): Observable<PersonalFindByIdResponse> {
    return this.http.get<PersonalFindByIdResponse>(
      `${this.API_URL}/personal/${id}`
    );
  }
}
