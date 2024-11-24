import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MeasuresResponse } from 'src/app/shared/models/measures/measuresResponse';
import { StudentMeasuresResponse } from 'src/app/shared/models/student/studentMeasuresResponse.';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MeasureService } from 'src/app/shared/services/measure.service';
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
    private studentService: StudentService,
    private confirmationService: ConfirmationService,
    private measureService: MeasureService
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
          if (resposta && resposta.measures) {
            this.myMeasures = resposta.measures; // Extrai apenas os treinos
          } else {
            this.myMeasures = []; // Garante que a lista seja inicializada
          }
          console.log('minhas medidas', this.myMeasures);
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
    this.measureService.delete(id).subscribe(
      () => {
        console.log('Item excluído com sucesso!');
        this.getMyMeasures();
        // Atualize a lista ou exiba uma mensagem ao usuário
      },
      (error) => {
        console.error('Erro ao excluir item:', error);
      }
    );
  }
}
