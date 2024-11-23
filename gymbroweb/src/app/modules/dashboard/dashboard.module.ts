import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { DashboardComponent } from './page/dashboard.component';
import { AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';

import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    SharedModule,
    PanelModule,
    ChartModule,
    CardModule,
    ButtonModule,
    TableModule,
  ],
})
export class DashboardModule {}
