import { Component, OnInit } from '@angular/core';
import { StudentMeasuresResponse } from 'src/app/shared/models/student/studentMeasuresResponse.';
import { WorkoutResponse } from 'src/app/shared/models/workout/workoutResponse';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-list-workout',
  templateUrl: './list-workout.component.html',
  styleUrls: ['./list-workout.component.scss'],
})
export class ListWorkoutComponent implements OnInit {
  sid: string | null = null;
  role: string | null = null;

  myMeasuresAndWorkouts: WorkoutResponse[] = [];

  // public myMeasuresAndWorkouts: Array<StudentMeasuresResponse> = [];

  constructor(
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const tokenData = this.authService.decodeToken();
    if (tokenData) {
      this.sid = tokenData.sid;
      this.role = tokenData.role;
    }
    console.log(this.sid, this.role);
    this.getMyMeasures();
  }

  getMyMeasures(): void {
    if (this.sid !== null && this.role === 'STUDENT') {
      this.studentService
        .listStudentMeasures(this.sid)
        .subscribe((resposta) => {
          console.log(resposta);
          if (resposta && resposta.workouts) {
            this.myMeasuresAndWorkouts = resposta.workouts; // Extrai apenas os treinos
          } else {
            this.myMeasuresAndWorkouts = []; // Garante que a lista seja inicializada
          }
          console.log(this.myMeasuresAndWorkouts); // Debug para conferir os dados
        });
    }
  }
}
