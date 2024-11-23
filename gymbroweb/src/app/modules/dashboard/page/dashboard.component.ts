import { Component, OnInit } from '@angular/core';
import { MeasuresResponse } from 'src/app/shared/models/measures/measuresResponse';
import { StudentMeasuresResponse } from 'src/app/shared/models/student/studentMeasuresResponse.';
import { AuthService } from 'src/app/shared/services/auth.service';
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

  //public myMeasures: Array<StudentMeasuresResponse> = [];
  myMeasures: MeasuresResponse[] = [];

  // public productsChartDatas!: ChartData;
  // public productsChartOptions!: ChartOptions;

  constructor(
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const tokenData = this.authService.decodeToken();
    if (tokenData) {
      this.sid = tokenData.sid;
      this.role = tokenData.role;
    }
    console.log(this.sid, this.role);
    this.getMyMeasures();
    //this.setProductsChartConfig();
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
