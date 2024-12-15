import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que el servicio esté importado correctamente

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  rol: string = 'pasajero'; // O 'conductor', dependiendo de lo que necesites
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método que se llama cuando se envía el formulario
  onRegister() {
    this.authService.registrar(this.nombre, this.correo, this.contrasena, this.rol).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'Registro exitoso';
        } else {
          this.successMessage = 'Hubo un problema al registrar al usuario';
        }
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.successMessage = 'Hubo un error, por favor intente nuevamente';
      }
    );
  }

  // Método para ir a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
