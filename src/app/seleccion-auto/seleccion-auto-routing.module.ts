import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionAutoComponent } from './seleccion-auto.component';

const routes: Routes = [
  {
    path: '',
    component: SeleccionAutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeleccionAutoRoutingModule {}
