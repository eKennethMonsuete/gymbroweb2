import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { MeasuresUpdate } from 'src/app/shared/models/measures/measuresUpdate';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-measures-edit',
  templateUrl: './measures-edit.component.html',
  styleUrls: ['./measures-edit.component.scss'],
})
export class MeasuresEditComponent implements OnDestroy, OnInit {
  measureId: number = 0;
  formMeasuresUpdate!: FormGroup;
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private measureService: MeasureService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.formMeasuresUpdate = this.formBuilder.group({
      weight: ['', [Validators.required, Validators.min(0)]],
      leftBiceps: ['', [Validators.required, Validators.min(0)]],
      rightBiceps: ['', [Validators.required, Validators.min(0)]],
      hips: ['', [Validators.required, Validators.min(0)]],
      leftQuadriceps: ['', [Validators.required, Validators.min(0)]],
      rightQuadriceps: ['', [Validators.required, Validators.min(0)]],
      leftCalf: ['', [Validators.required, Validators.min(0)]],
      rightCalf: ['', [Validators.required, Validators.min(0)]],
      studentId: ['', [Validators.required, Validators.min(0)]],
      previousDate: [''],
    });
  }

  ngOnInit(): void {
    this.getMeasureId();
  }

  getMeasureId() {
    const id = this.route.snapshot.paramMap.get('id');
    this.measureId = id !== null ? +id : 0;

    if (this.measureId) {
      this.measureService
        .findById(this.measureId)
        .subscribe((measure: MeasuresUpdate) => {
          if (measure) {
            this.formMeasuresUpdate.patchValue(measure);
          }
        });
    }
    console.log(this.measureId);
  }
  updateMyMeasures() {
    if (this.formMeasuresUpdate.valid) {
      const updatedMeasures: MeasuresUpdate = {
        ...this.formMeasuresUpdate.value,
        id: this.measureId,
      };
      this.measureService
        .updateMeasures(this.measureId, updatedMeasures)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Medida atualizada com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar Medidas!',
              life: 2500,
            });
          },
        });
      setTimeout(() => {
        this.location.back();
      }, 3000);

      //this.router.navigate(['dashboard']);
    }
  }
  cancel() {
    //  this.router.navigate(['dashboard']);
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
