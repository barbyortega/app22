import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConductorDashboardComponent } from './conductor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ConductorDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorDashboardRoutingModule {}
