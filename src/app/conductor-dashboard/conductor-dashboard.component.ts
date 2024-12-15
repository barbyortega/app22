import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMapsService } from '../services/google-maps.service';
import { TripService } from '../services/trip.service';
import { AuthService } from '../services/auth.service';
import { Trip } from '../models/trip.model';

declare var google: any;

@Component({
  selector: 'app-conductor-dashboard',
  templateUrl: './conductor-dashboard.component.html',
  styleUrls: ['./conductor-dashboard.component.scss']
})
export class ConductorDashboardComponent implements AfterViewInit {
  trips: Trip[] = [];
  isLoading: boolean = false;
  error: string = '';
  userName: string = '';
  // Coordenadas de la dirección específica
  center: google.maps.LatLngLiteral = { lat: -41.469903, lng: -72.925592 };
  zoom: number = 12;  // Aumenté el zoom para que sea más cercano a la ubicación
  map: google.maps.Map | undefined;

  constructor(
    private router: Router,
    private tripService: TripService,
    private authService: AuthService,
    private googleMapsService: GoogleMapsService
  ) { }

  ngAfterViewInit() {
    this.loadTrips();
    this.userName = localStorage.getItem('userName') || 'Invitado';

    // Carga la API de Google Maps
    this.googleMapsService.loadMapsAPIFunction().then(() => {
      // Esperar a que el elemento #map esté presente antes de inicializar el mapa
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error("El elemento del mapa no existe.");
        return;
      }
      this.initMap(mapElement);  // Llamamos a initMap con el elemento #map ya verificado
    }).catch((error) => {
      console.error('Error al cargar la API de Google Maps:', error);
    });
  }

  loadTrips() {
    this.isLoading = true;
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.isLoading = false;
        console.log('Conexión a la API exitosa');
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información de los viajes.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  initMap(mapElement: HTMLElement) {
    // Configuración del mapa con la ubicación específica
    const mapOptions = {
      center: this.center,  // Coordenadas de Egaña 651
      zoom: this.zoom,  // Ajuste del zoom
      gestureHandling: 'cooperative',  // Permite interacciones táctiles más suaves
    };
    this.map = new google.maps.Map(mapElement, mapOptions);
  }

  viewRoutes() {
    this.router.navigate(['/routes']);
  }

  requestHelp() {
    console.log('Solicitar ayuda');
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  editProfile() {
    this.router.navigate(['/editar-perfil']);
  }

  logout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/home']);
  }
}
