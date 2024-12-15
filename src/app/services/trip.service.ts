import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // Datos de ejemplo con rutas que comienzan en Duoc UC y tarifas en pesos chilenos.
  private trips = [
    { id: 1, route: 'Duoc UC a Los Muermos', fare: '5000 CLP' },
    { id: 2, route: 'Duoc UC a Mirasol', fare: '700 CLP' },
    { id: 3, route: 'Duoc UC a Puerto Varas', fare: '1500 CLP' },
    { id: 4, route: 'Duoc UC a Tepual', fare: '1300 CLP' },
    { id: 5, route: 'Duoc UC a Alerce', fare: '1700 CLP' }
  ];

  private key = 'trips'; // Clave para LocalStorage

  constructor() {
    this.loadTripsFromLocalStorage(); // Cargar trips desde LocalStorage al inicializar el servicio
  }

  // Método para obtener la lista de viajes
  getTrips(): Observable<any[]> {
    return of(this.trips);
  }

  // Método para obtener un viaje por ID
  getTripById(id: number): Observable<any> {
    const trip = this.trips.find(t => t.id === id);
    return of(trip);
  }

  // Método para agregar un nuevo viaje
  addTrip(trip: any): Observable<any> {
    this.trips.push(trip);
    this.saveTripsToLocalStorage();
    return of(trip);
  }

  // Método para actualizar un viaje existente
  updateTrip(id: number, updatedTrip: any): Observable<any> {
    const index = this.trips.findIndex(t => t.id === id);
    if (index !== -1) {
      this.trips[index] = { ...this.trips[index], ...updatedTrip };
      this.saveTripsToLocalStorage();
      return of(this.trips[index]);
    }
    return of(null);
  }

  // Método para eliminar un viaje
  deleteTrip(id: number): Observable<boolean> {
    const index = this.trips.findIndex(t => t.id === id);
    if (index !== -1) {
      this.trips.splice(index, 1);
      this.saveTripsToLocalStorage();
      return of(true);
    }
    return of(false);
  }

  // Métodos para manejar LocalStorage

  // Guardar trips en LocalStorage
  private saveTripsToLocalStorage(): void {
    localStorage.setItem(this.key, JSON.stringify(this.trips));
    console.log('Trips guardados en LocalStorage:', this.trips);
  }

  // Cargar trips desde LocalStorage
  private loadTripsFromLocalStorage(): void {
    const storedTrips = localStorage.getItem(this.key);
    if (storedTrips) {
      this.trips = JSON.parse(storedTrips);
      console.log('Trips cargados desde LocalStorage:', this.trips);
    }
  }

  // Limpiar todos los trips en LocalStorage
  clearTrips(): Observable<boolean> {
    localStorage.removeItem(this.key);
    this.trips = [];
    console.log('Todos los trips han sido eliminados de LocalStorage.');
    return of(true);
  }
}
