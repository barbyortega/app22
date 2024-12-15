import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasajeroDashboardComponent } from './pasajero-dashboard.component';
import { SeleccionAutoComponent } from '../seleccion-auto/seleccion-auto.component'; // Ruta ajustada

const routes: Routes = [
  {
    path: '',
    component: PasajeroDashboardComponent
  },
  {
    path: 'seleccion-auto',
    component: SeleccionAutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasajeroDashboardRoutingModule {}
