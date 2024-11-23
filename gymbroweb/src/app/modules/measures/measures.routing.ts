import { Routes, RouterModule } from '@angular/router';
import { MeasuresFormComponent } from './measures-form/measures-form/measures-form.component';
import { ListMeasuresComponent } from './list-measures/list-measures.component';
import { MeasuresEditComponent } from './measures-edit/measures-edit/measures-edit.component';

export const MEASURES_ROUTES: Routes = [
  {
    path: '',
    component: MeasuresFormComponent,
  },
  {
    path: 'list',
    component: ListMeasuresComponent,
  },
  {
    path: 'update/:id',
    component: MeasuresEditComponent,
  },
];
