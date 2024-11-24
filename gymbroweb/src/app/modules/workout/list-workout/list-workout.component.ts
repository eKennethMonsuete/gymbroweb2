import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { StudentMeasuresResponse } from 'src/app/shared/models/student/studentMeasuresResponse.';
import { WorkoutResponse } from 'src/app/shared/models/workout/workoutResponse';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

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
    private studentService: StudentService,
    private confirmationService: ConfirmationService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    const tokenData = this.authService.decodeToken();
    if (tokenData) {
      this.sid = tokenData.sid;
      this.role = tokenData.role;
    }
    console.log(this.sid, this.role);
    this.getMyWorkout();
  }

  getMyWorkout(): void {
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
  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este item?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim', // Texto do botão de confirmação
      rejectLabel: 'Não',
      accept: () => {
        this.deleteItem(id); // Chama a função de exclusão
      },
      reject: () => {
        // Você pode executar algo no caso de rejeição, se necessário
        console.log('Ação cancelada!');
      },
    });
  }

  deleteItem(id: number) {
    this.workoutService.delete(id).subscribe(
      () => {
        console.log('Item excluído com sucesso!');
        this.getMyWorkout();
        // Atualize a lista ou exiba uma mensagem ao usuário
      },
      (error) => {
        console.error('Erro ao excluir item:', error);
      }
    );
  }
}
