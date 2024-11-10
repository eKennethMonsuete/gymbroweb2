import { Routes, RouterModule } from '@angular/router';
import { MeasuresFormComponent } from './measures-form/measures-form/measures-form.component';

export const MEASURES_ROUTES: Routes = [
  {
    path: '',
    component: MeasuresFormComponent,
  },
];
