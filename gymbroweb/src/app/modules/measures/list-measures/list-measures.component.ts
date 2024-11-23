import { Component, OnInit } from '@angular/core';
import { MeasuresResponse } from 'src/app/shared/models/measures/measuresResponse';
import { StudentMeasuresResponse } from 'src/app/shared/models/student/studentMeasuresResponse.';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-list-measures',
  templateUrl: './list-measures.component.html',
  styleUrls: ['./list-measures.component.css'],
})
export class ListMeasuresComponent implements OnInit {
  sid: string | null = null;
  role: string | null = null;

  myMeasures: MeasuresResponse[] = [];

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
    if (this.sid !== null && this.role == 'STUDENT') {
      this.studentService
        .listStudentMeasures(this.sid)
        .subscribe((resposta) => {
          if (resposta && resposta.Measures) {
            this.myMeasures = resposta.Measures; // Extrai apenas os treinos
          } else {
            this.myMeasures = []; // Garante que a lista seja inicializada
          }
          console.log(this.myMeasures);
        });
    }
  }
}
