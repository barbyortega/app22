// src/app/models/auto.model.ts
export interface Auto {
    conductor: string;
    modelo: string;
    ruta: string;
    tarifa: number;
    puntoDestino?: string; // Opcional
    imagenUrl: string; // Nueva propiedad para la URL de la imagen
  }
  