import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { ListWorkoutComponent } from './list-workout/list-workout.component';

export const WORKOUT_ROUTES: Routes = [
  {
    path: '',
    component: WorkoutFormComponent,
  },
  {
    path: 'list',
    component: ListWorkoutComponent,
  },
];
