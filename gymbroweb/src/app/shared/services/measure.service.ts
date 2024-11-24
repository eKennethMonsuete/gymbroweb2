import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { MeasuresInput } from '../models/measures/measuresInput';
import { Observable } from 'rxjs';
import { MeasuresResponse } from '../models/measures/measuresResponse';
import { MeasuresUpdate } from '../models/measures/measuresUpdate';

@Injectable({
  providedIn: 'root',
})
export class MeasureService {
  private API_URL = environment.serviceUrl;
  private JWT_TOKEN = sessionStorage.getItem('user-info');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createMeasure(requestData: MeasuresInput): Observable<MeasuresResponse> {
    return this.http.post<MeasuresResponse>(
      `${this.API_URL}/measures`,
      requestData
    );
  }

  updateMeasures(
    id: number,
    measures: MeasuresUpdate
  ): Observable<MeasuresResponse> {
    return this.http.put<MeasuresResponse>(
      `${this.API_URL}/measures/${id}`,
      measures
    );
  }

  findById(id: number) {
    return this.http.get<any>(`${this.API_URL}/measures/${id}`);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/measures/${id}`);
  }
}
