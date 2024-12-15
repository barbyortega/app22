export class SeleccionAutoComponent {
  autos = [
    {
      conductor: 'Pedro López',
      modelo: 'Toyota Prius',
      ruta: 'Centro - Plaza',
      tarifa: 1500,
      lat: -41.4710,
      lng: -72.9260
    },
    {
      conductor: 'Raquel Rehbein',
      modelo: 'Hyundai Elantra',
      ruta: 'Aeropuerto - Centro',
      tarifa: 2000,
      lat: -41.4705,
      lng: -72.9275
    }
  ];

  constructor() { }

  seleccionarAuto(auto: any) {
    console.log('Auto seleccionado:', auto);
  }
}
