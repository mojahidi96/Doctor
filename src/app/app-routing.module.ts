import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './appModules/account/login/login.component';
import { DashboardTemplateComponent } from './containers/dashboard-template/dashboard-template.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
  path: 'login',
  component: LoginComponent,
  },
{
  path: 'home',
  component: DashboardTemplateComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
