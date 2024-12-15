import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecuperacionPage } from './recuperacion.page';
import { RecuperacionPageRoutingModule } from './recuperacion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperacionPageRoutingModule
  ],
  declarations: [RecuperacionPage]
})
export class RecuperacionModule {}
