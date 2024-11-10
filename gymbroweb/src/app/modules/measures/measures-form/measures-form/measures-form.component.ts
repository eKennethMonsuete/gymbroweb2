import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { MeasuresInput } from 'src/app/shared/models/measures/measuresInput';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-measures-form',
  templateUrl: './measures-form.component.html',
  styleUrls: ['./measures-form.component.scss'],
})
export class MeasuresFormComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private measureService: MeasureService,
    private messageService: MessageService
  ) {}

  public addMeasureForm = this.formBuilder.group({
    weight: ['', [Validators.required, Validators.min(0)]],
    hips: ['', [Validators.required, Validators.min(0)]],
    leftBiceps: ['', [Validators.required, Validators.min(0)]],
    rightBiceps: ['', [Validators.required, Validators.min(0)]],
    leftQuadriceps: ['', [Validators.required, Validators.min(0)]],
    rightQuadriceps: ['', [Validators.required, Validators.min(0)]],
    leftCalf: ['', [Validators.required, Validators.min(0)]],
    rightCalf: ['', [Validators.required, Validators.min(0)]],
    studentId: ['', [Validators.required, Validators.min(0)]],
    previousDate: [''],
  });

  addMeasure(): void {
    if (this.addMeasureForm?.valid) {
      const requestAddMeasures: MeasuresInput = {
        weight: Number(this.addMeasureForm.value.weight),
        hips: Number(this.addMeasureForm.value.hips),
        leftBiceps: Number(this.addMeasureForm.value.leftBiceps),
        rightBiceps: Number(this.addMeasureForm.value.rightBiceps),
        leftQuadriceps: Number(this.addMeasureForm.value.leftQuadriceps),
        rightQuadriceps: Number(this.addMeasureForm.value.rightQuadriceps),
        leftCalf: Number(this.addMeasureForm.value.leftCalf),
        rightCalf: Number(this.addMeasureForm.value.rightCalf),
        studentId: Number(this.addMeasureForm.value.studentId),
        previousDate: this.addMeasureForm.value.previousDate as string,
      };
      console.log(this.addMeasureForm.value);

      this.measureService
        .createMeasure(requestAddMeasures)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Medida registrada com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao cadastrar Medidas!',
              life: 2500,
            });
          },
        });
    }
    this.addMeasureForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
