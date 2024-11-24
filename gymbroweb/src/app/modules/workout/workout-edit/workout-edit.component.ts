import { WorkoutInput } from './../../../shared/models/workout/workoutInput';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css'],
})
export class WorkoutEditComponent implements OnInit, OnDestroy {
  workoutId: number = 0;
  workoutInputFormUpdate!: FormGroup;
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.workoutInputFormUpdate = this.formBuilder.group({
      workoutName: ['', [Validators.required]],
      exercise: ['', [Validators.required]],
      description: [''],
      note: [''],
      studentId: [''],
    });
  }

  ngOnInit() {
    this.getMeasureId();
  }

  getMeasureId() {
    const id = this.route.snapshot.paramMap.get('id');
    this.workoutId = id !== null ? +id : 0;

    if (this.workoutId) {
      this.workoutService
        .findById(this.workoutId)
        .subscribe((workout: WorkoutInput) => {
          if (workout) {
            this.workoutInputFormUpdate.patchValue(workout);
          }
        });
    }
    console.log(this.workoutId);
  }

  updateMyMeasures() {
    if (this.workoutInputFormUpdate.valid) {
      const updatedWorkout: WorkoutInput = {
        ...this.workoutInputFormUpdate.value,
        id: this.workoutId,
      };
      this.workoutService
        .updateWorkout(this.workoutId, updatedWorkout)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Treino atualizado com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar Treino!',
              life: 2500,
            });
          },
        });
      setTimeout(() => {
        this.location.back();
      }, 3000);
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
