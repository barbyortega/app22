import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroRoutingModule
  ],
  declarations: [RegistroComponent]
})
export class RegistroModule {} 
