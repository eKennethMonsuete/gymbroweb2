import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { StudentInput } from '../models/student/studentInput';
import { Observable } from 'rxjs';
import { StudentResponseSimple } from '../models/student/studentResponseSimple';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private API_URL = environment.serviceUrl;
  private JWT_TOKEN = sessionStorage.getItem('user-info');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createPersonal(request: StudentInput): Observable<StudentResponseSimple> {
    return this.http.post<StudentResponseSimple>(
      `${this.API_URL}/student`,
      request
    );
  }
}