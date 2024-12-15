import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConductorDashboardComponent } from './conductor-dashboard.component'; // Importa el componente desde el archivo correcto
import { ConductorDashboardRoutingModule } from './conductor-dashboard-routing.module'; // Importa el módulo de enrutamiento
import { GoogleMapsModule } from '@angular/google-maps'; 

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ConductorDashboardRoutingModule, // Coma añadida aquí
    GoogleMapsModule
  ],
  declarations: [ConductorDashboardComponent] // Declara el componente aquí
})
export class ConductorDashboardModule {}
