import { WorkoutInput } from './../../../shared/models/workout/workoutInput';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css'],
})
export class WorkoutEditComponent implements OnInit {
  workoutId: number = 0;
  workoutInputFormUpdate!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private workoutService: WorkoutService,
    private route: ActivatedRoute
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
        .subscribe(
          (response) => {
            console.log('deu certo');
          },
          (error) => {
            console.error('deu erro', error);
          }
        );
    }
  }
}
