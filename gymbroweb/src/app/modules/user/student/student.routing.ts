import { Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'add',
    component: StudentFormComponent,
  },
  {
    path: 'update/:id',
    component: StudentEditComponent,
  },
];
