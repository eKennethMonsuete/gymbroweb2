import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    // canActivate: [AuthGuardService],
  },
  {
    path: 'createmeasures',
    loadChildren: () =>
      import('./modules/measures/measures.module').then(
        (m) => m.MeasuresModule
      ),
    // canActivate: [AuthGuardService],
  },
  {
    path: 'addpersonal',
    loadChildren: () =>
      import('./modules/user/personal/personal.module').then(
        (p) => p.PersonalModule
      )
    
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
