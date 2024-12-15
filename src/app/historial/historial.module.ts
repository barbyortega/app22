import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistorialComponent } from './historial.component';

@NgModule({
  declarations: [HistorialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HistorialComponent }  // Carga el HistorialComponent en esta ruta
    ])
  ]
})
export class HistorialModule {}
