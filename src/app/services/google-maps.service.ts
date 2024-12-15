import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var google: any; // Aseguramos que google esté declarado

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  constructor() {}

  loadMapsAPIFunction(libraries: string[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      // Comprobar si Google Maps ya está cargado
      if (typeof google !== 'undefined' && google.maps) {
        resolve(); // La API ya está cargada
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=${libraries.join(',')}&callback=initMap`;
      script.async = true; // Carga asíncrona
      script.defer = true; // Asegura que el script se ejecute después de que el documento se haya analizado
      script.onload = () => resolve(); // Resuelve la promesa cuando se carga
      script.onerror = (error: any) => reject(error); // Rechaza la promesa si hay un error
      document.head.appendChild(script); // Añade el script al head del documento
    });
  }

  // Método para crear una ruta en el mapa
  crearRuta(map: google.maps.Map, origen: string, destino: string): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    // Geocodificación de las direcciones
    this.geocodeAddress(origen).then((origenCoords) => {
      this.geocodeAddress(destino).then((destinoCoords) => {
        directionsService.route(
          {
            origin: origenCoords,
            destination: destinoCoords,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
            // Aseguramos que 'status' es 'OK' antes de usar 'result'
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result); // Mostrar la ruta
            } else {
              console.error('Error al calcular la ruta:', status);
            }
          }
        );
      }).catch(err => {
        console.error('Error geocodificando destino:', err);
      });
    }).catch(err => {
      console.error('Error geocodificando origen:', err);
    });
  }

  // Método para geocodificar una dirección
  private geocodeAddress(address: string): Promise<google.maps.LatLngLiteral> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject('Geocoding failed: ' + status);
        }
      });
    });
  }
}
