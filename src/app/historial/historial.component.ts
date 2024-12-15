import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  historial: { origen: string; destino: string; fecha: string }[] = [];

  ngOnInit(): void {
    // Obtener el historial del localStorage
    const historialGuardado = JSON.parse(localStorage.getItem('historial') || '[]');
    this.historial = historialGuardado;
  }
}
