import { WorkoutResponse } from './../models/workout/workoutResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { WorkoutInput } from '../models/workout/workoutInput';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private API_URL = environment.serviceUrl;
  private JWT_TOKEN = sessionStorage.getItem('user-info');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createWorkout(request: WorkoutInput): Observable<WorkoutResponse> {
    return this.http.post<WorkoutResponse>(`${this.API_URL}/workout`, request);
  }

  updateWorkout(
    id: number,
    workout: WorkoutInput
  ): Observable<WorkoutResponse> {
    return this.http.put<WorkoutResponse>(
      `${this.API_URL}/workout/${id}`,
      workout
    );
  }

  findById(id: number) {
    return this.http.get<any>(`${this.API_URL}/workout/${id}`);
  }
}
