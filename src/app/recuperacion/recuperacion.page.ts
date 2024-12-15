//recuperacion.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss']
})
export class RecuperacionPage {
  correo: string = '';  // Propiedad para el correo
  nuevaContrasena: string = '';  // Propiedad para la nueva contraseña
  codigo: string = '';  // Propiedad para el código de validación
  isValidated: boolean = false;  // Bandera que indica si el correo fue validado
  codigoValido: string = '2980246'; // Código simulado para validación
  codigoInvalido: boolean = false; // Bandera que indica si el código es incorrecto
  correoInvalido: boolean = false; // Bandera para mostrar error de correo inválido


  constructor(private authService: AuthService, private router: Router, private navCtrl: NavController) {}


  // Validación simple de correo
  validarCorreo(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.correo);
  }


  // Simula el proceso de validación de correo
  simularEnvioCodigo() {
    if (this.correo && this.validarCorreo()) {
      this.isValidated = true; // Cambia el estado a 'validado'
      this.correoInvalido = false; // Reinicia el error de correo
      alert('Código de validación enviado a tu correo');
    } else {
      this.correoInvalido = true; // Muestra error si el correo no es válido
      alert('Por favor, ingresa un correo válido');
    }
  }


  // Método para la recuperación de contraseña
  recuperarContrasena() {
    if (this.codigo === this.codigoValido) {
      // Guarda la nueva contraseña en el localStorage
      localStorage.setItem('password', this.nuevaContrasena);
      alert('Contraseña cambiada correctamente');
      this.router.navigate(['/login']);  // Redirige al login después de la recuperación
    } else {
      this.codigoInvalido = true; // Muestra error si el código no es válido
      alert('Código de validación incorrecto');
    }
  }


  // Función para volver atrás en la navegación
  volverAtras() {
    this.navCtrl.back();  // Regresa a la página anterior en el stack de navegación
  }
}


