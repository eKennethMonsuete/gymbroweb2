import { SharedModule } from './../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WORKOUT_ROUTES } from './workout.routing';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListWorkoutComponent } from './list-workout/list-workout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    SharedModule,
    CardModule,
    ConfirmDialogModule,
  ],
  declarations: [
    WorkoutFormComponent,
    ListWorkoutComponent,
    WorkoutEditComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService],
})
export class WorkoutModule {}
