import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { PERSONAL_ROUTES } from './personal.routing';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PERSONAL_ROUTES),
    PanelModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  declarations: [PersonalFormComponent]
})
export class PersonalModule { }
