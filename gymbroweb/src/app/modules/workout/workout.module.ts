import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WORKOUT_ROUTES } from './workout.routing';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WORKOUT_ROUTES),
    PanelModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  declarations: [WorkoutFormComponent],
})
export class WorkoutModule {}