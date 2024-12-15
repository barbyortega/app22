import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [
    CommonModule,
    IonicModule // Agrega IonicModule a los imports
  ],
  exports: [SplashScreenComponent]
})
export class SplashScreenModule { }
