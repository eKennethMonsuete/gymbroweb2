import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ConfirmationService } from 'primeng/api';
import { MeasuresResponse } from 'src/app/shared/models/measures/measuresResponse';
import { StudentMeasuresResponse } from 'src/app/shared/models/student/studentMeasuresResponse.';
import { StudentResponseSimple } from 'src/app/shared/models/student/studentResponseSimple';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PersonalService } from 'src/app/shared/services/personal.service';
import { StudentService } from 'src/app/shared/services/student.service';
//import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: '././dashboard.component.html',
  styleUrls: ['././dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sid: string | null = null;
  role: string | null = null;
  name: string | null = null;
  showToolbar: boolean = true;

  // basicData: any;

  // basicOptions: any;

  //public myMeasures: Array<StudentMeasuresResponse> = [];
  myMeasures: MeasuresResponse[] = [];
  myStudents: StudentResponseSimple[] = [];

  public basicData!: ChartData;
  public basicOptions!: ChartOptions;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private personalService: PersonalService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const tokenData = this.authService.decodeToken();
    if (tokenData) {
      this.sid = tokenData.sid;
      this.role = tokenData.role;
      this.name = tokenData.name;
    }
    console.log(this.sid, this.role);
    this.getMyMeasures();
    this.getStudentsForPersonal();
    //this.setProductsChartConfig();
    this.updateChartData();
  }

  // getMyMeasures(): void {
  //   if (this.sid !== null && this.role == 'STUDENT') {
  //     this.studentService
  //       .listStudentMeasures(this.sid)
  //       .subscribe((resposta) => {
  //         if (resposta && resposta.measures) {
  //           this.myMeasures = resposta.measures; // Extrai apenas os treinos
  //         } else {
  //           this.myMeasures = []; // Garante que a lista seja inicializada
  //         }
  //         console.log(this.myMeasures);
  //       });
  //   }

  getMyMeasures(): void {
    if (this.sid !== null && this.role == 'STUDENT') {
      this.studentService
        .listStudentMeasures(this.sid)
        .subscribe((resposta) => {
          console.log('Resposta do backend:', resposta);
          if (resposta && resposta.measures) {
            this.myMeasures = resposta.measures;
            console.log('Dados de myMeasures:', this.myMeasures);
            this.updateChartData(); // Atualiza o gráfico com os dados dinâmicos
          } else {
            this.myMeasures = [];
            console.log('Nenhuma medida encontrada.');
          }
        });
    }
  }

  getStudentsForPersonal(): void {
    if (this.sid !== null && this.role == 'PERSONAL') {
      this.personalService
        .listPersonalStudents(this.sid)
        .subscribe((resposta) => {
          if (resposta && resposta.students) {
            this.myStudents = resposta.students;
          } else {
            console.log('algo deu errado');
            this.myStudents = [];
          }
          console.log('Meus alunos', this.myStudents);
        });
    }
  }

  updateChartData(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Gera rótulos incrementais (1, 2, 3, ...)
    const labels = this.myMeasures.map((_, index) => (index + 1).toString());

    // Extrai os valores de peso
    const weights = this.myMeasures.map((measure) => measure.weight);

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Peso (kg)',
          data: weights,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            // drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            // drawBorder: false,
          },
        },
      },
    };
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
    this.studentService.delete(id).subscribe(
      () => {
        console.log('Item excluído com sucesso!');
        this.getStudentsForPersonal();
        // Atualize a lista ou exiba uma mensagem ao usuário
      },
      (error) => {
        console.error('Erro ao excluir item:', error);
      }
    );
  }

  // setProductsChartConfig(): void {
  //   if (this.myMeasures) {
  //     const documentStyle = getComputedStyle(document.documentElement);
  //     const textColor = documentStyle.getPropertyValue('--text-color');
  //     const textColorSecondary = documentStyle.getPropertyValue(
  //       '--text-color-secondary'
  //     );
  //     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //     // Mapear labels (datas) e dados (peso)
  //     const labels = this.myMeasures.map((measure) =>
  //       new Date(measure.createdAt).toLocaleDateString('pt-BR')
  //     );
  //     const weights = this.myMeasures.map((measure) => measure.Measures.Weight);
  //     console.log('Labels:', labels);
  //     console.log('Weights:', weights);

  //     // Configuração dos dados do gráfico
  //     this.productsChartDatas = {
  //       labels: labels, // Datas como labels no eixo X
  //       datasets: [
  //         {
  //           label: 'Peso (kg)', // Legenda do dataset
  //           backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
  //           borderColor: documentStyle.getPropertyValue('--indigo-400'),
  //           hoverBackgroundColor:
  //             documentStyle.getPropertyValue('--indigo-500'),
  //           data: weights, // Pesos no eixo Y
  //         },
  //       ],
  //     };

  //     // Configuração do estilo do gráfico
  //     this.productsChartOptions = {
  //       maintainAspectRatio: false,
  //       aspectRatio: 2,
  //       plugins: {
  //         legend: {
  //           labels: {
  //             color: '#495057',
  //           },
  //         },
  //       },
  //       scales: {
  //         x: {
  //           ticks: {
  //             color: '#495057',
  //           },
  //           grid: {
  //             color: '#ebedef',
  //           },
  //         },
  //         y: {
  //           ticks: {
  //             color: '#495057',
  //           },
  //           grid: {
  //             color: '#ebedef',
  //           },
  //         },
  //       },
  //     };
  //   }

  // setProductsChartConfig(): void {
  //   if (this.myMeasures) {
  //     const documentStyle = getComputedStyle(document.documentElement);
  //     const textColor = documentStyle.getPropertyValue('--text-color');
  //     const textColorSecondary = documentStyle.getPropertyValue(
  //       '--text-color-secondary'
  //     );
  //     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //     // Mapear labels (datas) e dados (peso)
  //     const labels = this.myMeasures.map((measure) =>
  //       new Date(measure.createdAt).toLocaleDateString('pt-BR')
  //     );
  //     const weights = this.myMeasures.map((measure) => measure.Measures.Weight);

  //     // Configuração dos dados do gráfico
  //     this.productsChartDatas = {
  //       labels: labels, // Datas como labels no eixo X
  //       datasets: [
  //         {
  //           label: 'Peso (kg)', // Legenda do dataset
  //           backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
  //           borderColor: documentStyle.getPropertyValue('--indigo-400'),
  //           hoverBackgroundColor:
  //             documentStyle.getPropertyValue('--indigo-500'),
  //           data: weights, // Pesos no eixo Y
  //         },
  //       ],
  //     };

  //     // Configuração do estilo do gráfico
  //     this.productsChartOptions = {
  //       maintainAspectRatio: false,
  //       aspectRatio: 0.8,
  //       plugins: {
  //         legend: {
  //           labels: {
  //             color: textColor,
  //           },
  //         },
  //       },
  //       scales: {
  //         x: {
  //           ticks: {
  //             color: textColorSecondary,
  //             font: {
  //               weight: 500,
  //             },
  //           },
  //           grid: {
  //             color: surfaceBorder,
  //           },
  //         },
  //         y: {
  //           ticks: {
  //             color: textColorSecondary,
  //           },
  //           grid: {
  //             color: surfaceBorder,
  //           },
  //         },
  //       },
  //     };
  //   }
  // }
  //}
}
