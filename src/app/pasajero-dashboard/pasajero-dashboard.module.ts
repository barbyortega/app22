// src/app/pasajero-dashboard/pasajero-dashboard.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PasajeroDashboardComponent } from './pasajero-dashboard.component';
import { PasajeroDashboardRoutingModule } from './pasajero-dashboard-routing.module';

// Importa el módulo que contiene SeleccionAutoComponent
import { SeleccionAutoModule } from '../seleccion-auto/seleccion-auto.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    PasajeroDashboardRoutingModule,
    SeleccionAutoModule  // Importa el módulo que contiene SeleccionAutoComponent
  ],
  declarations: [PasajeroDashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PasajeroDashboardModule {}
