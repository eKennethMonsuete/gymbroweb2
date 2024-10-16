import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { DashboardComponent } from './page/dashboard.component';
import { AvatarModule } from 'primeng/avatar';

import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    SharedModule,
    AvatarModule,
    ButtonModule,
    ToolbarModule,
  ],
})
export class DashboardModule {}
