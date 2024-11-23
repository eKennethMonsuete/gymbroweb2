import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './student-form/student-form.component';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { STUDENT_ROUTES } from './student.routing';
import { RouterModule } from '@angular/router';
import { StudentEditComponent } from './student-edit/student-edit.component';

@NgModule({
  declarations: [StudentFormComponent, StudentEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(STUDENT_ROUTES),
    PanelModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class StudentModule {}
