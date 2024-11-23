import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { ListWorkoutComponent } from './list-workout/list-workout.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';

export const WORKOUT_ROUTES: Routes = [
  {
    path: 'add',
    component: WorkoutFormComponent,
  },
  {
    path: 'list',
    component: ListWorkoutComponent,
  },
  {
    path: 'update/:id',
    component: WorkoutEditComponent,
  },
];
