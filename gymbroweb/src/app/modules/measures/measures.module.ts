import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasuresFormComponent } from './measures-form/measures-form/measures-form.component';
import { RouterModule } from '@angular/router';
import { MEASURES_ROUTES } from './measures.routing';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MeasuresEditComponent } from './measures-edit/measures-edit/measures-edit.component';
import { InputTextModule } from 'primeng/inputtext';
import { ListMeasuresComponent } from './list-measures/list-measures.component';

@NgModule({
  declarations: [MeasuresFormComponent, MeasuresEditComponent, ListMeasuresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MEASURES_ROUTES),
    PanelModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MeasuresModule {}
