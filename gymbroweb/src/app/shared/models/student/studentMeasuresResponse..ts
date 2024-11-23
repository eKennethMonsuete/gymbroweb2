import { MeasuresResponse } from '../measures/measuresResponse';
import { WorkoutResponse } from '../workout/workoutResponse';

export interface StudentMeasuresResponse {
  name: string;
  email: string;
  password: string;
  lastName: string;
  phone: string;
  personalId: number;
  createdAt: string;
  Measures: MeasuresResponse[];

  workouts: WorkoutResponse[];
}
