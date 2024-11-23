import { Routes, RouterModule } from '@angular/router';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { PersonalEditComponent } from './personal-edit/personal-edit.component';

export const PERSONAL_ROUTES: Routes = [
  {
    path: 'add',
    component: PersonalFormComponent,
  },
  {
    path: 'update/:id',
    component: PersonalEditComponent,
  },
];
