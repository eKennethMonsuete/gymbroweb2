import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { WorkoutInput } from 'src/app/shared/models/workout/workoutInput';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    //private studentService: StudentService,
    private messageService: MessageService,
    private router: Router,
    private workoutService: WorkoutService
  ) {}
  ngOnInit() {}

  public AddWorkoutForm = this.formBuilder.group({
    workoutName: ['', [Validators.required]],
    exercise: ['', [Validators.required]],
    description: [''],
    note: [''],
    studentId: ['', [Validators.required, Validators.min(0)]],
  });

  addWorkout(): void {
    if (this.AddWorkoutForm?.value && this.AddWorkoutForm?.valid) {
      const requestAddWorkout: WorkoutInput = {
        workoutName: this.AddWorkoutForm.value.workoutName as string,
        exercise: this.AddWorkoutForm.value.exercise as string,
        description: this.AddWorkoutForm.value.description as string,
        note: this.AddWorkoutForm.value.note as string,
        studentId: Number(this.AddWorkoutForm.value.studentId),
      };
      console.log(requestAddWorkout);
      this.workoutService
        .createWorkout(requestAddWorkout)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Treino registrado com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err, 'Erro ao cadastrar Treino!');
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao cadastrar Treino!',
              life: 2500,
            });
          },
        });
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 2600);
      // this.AddWorkoutForm.reset();
      // this.router.navigate(['dashboard']);
    }
  }

  cancelAndClearForm() {
    this.AddWorkoutForm.reset();
    this.router.navigate(['dashboard']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
