// src/app/seleccion-auto/seleccion-auto.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SeleccionAutoComponent } from './seleccion-auto.component';
import { SeleccionAutoRoutingModule } from './seleccion-auto-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SeleccionAutoRoutingModule
  ],
  declarations: [
    SeleccionAutoComponent
  ]
})
export class SeleccionAutoModule {}
