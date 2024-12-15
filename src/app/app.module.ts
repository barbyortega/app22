import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenModule } from './splash-screen/splash-screen.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RecuperacionModule } from './recuperacion/recuperacion.module'; // Asegúrate de que la ruta sea correcta
import { RegistroModule } from './registro/registro.module'; // Asegúrate de que la ruta sea correcta
import { HistorialModule } from './historial/historial.module';


@NgModule({
  declarations: [
    AppComponent, // Solo declaramos el componente principal
    // Aquí eliminamos RegistroComponent y RecuperacionPage, ya que se declaran en sus respectivos módulos
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    FormsModule,
    RecuperacionModule, // Importa el módulo de recuperación
    RegistroModule, // Importa el módulo de registro
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega este esquema para manejar elementos personalizados
})
export class AppModule {}
