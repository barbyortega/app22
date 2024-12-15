// src/app/seleccion-auto/seleccion-auto.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { Auto } from '../models/auto.model'; // Importa el modelo

@Component({
  selector: 'app-seleccion-auto',
  templateUrl: './seleccion-auto.component.html',
  styleUrls: ['./seleccion-auto.component.scss']
})
export class SeleccionAutoComponent {
  autos: Auto[] = [
    // Ejemplo de datos con URL de la imagen
    { conductor: 'Juan Pérez', modelo: 'Toyota Corolla', ruta: 'Ruta 1', tarifa: 5000, puntoDestino: '', imagenUrl: 'assets/img/Corolla.jpg' },
    { conductor: 'Ana Gómez', modelo: 'Honda Civic', ruta: 'Ruta 2', tarifa: 6000, puntoDestino: '', imagenUrl: 'assets/img/civic.jpg' }
    // Agrega más autos según sea necesario
  ];

  constructor(private router: Router) {} // Inyecta el Router

  seleccionarAuto(auto: Auto) {
    console.log('Auto seleccionado:', auto);
  }

  confirmarSeleccion(auto: Auto) {
    console.log('Confirmar selección para:', auto);
    console.log('Punto de destino:', auto.puntoDestino);
    // Aquí puedes manejar la confirmación de la selección
  }

  volver() {
    this.router.navigate(['/pasajero-dashboard']); // Redirige a la página del pasajero
  }
}
