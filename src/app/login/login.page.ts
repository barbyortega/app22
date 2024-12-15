import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('1s ease-in')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      transition('void => *', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('email');
    const userPassword = localStorage.getItem('password');
  
    if (userName && userEmail && userPassword) {
      // Aquí ya tienes los datos del usuario, que deberían persistir
      console.log('Usuario cargado:', { userName, userEmail, userPassword });
      // Puedes establecer estos datos en tu estado de la aplicación o en tu interfaz
    } else {
      console.log('No se encontraron datos en localStorage, el usuario no está autenticado');
      // Redirige al usuario al login si no están los datos en localStorage
    }
  }
  
  onLogin() {
    this.error = '';

    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.success) {
        if (response.role === 'conductor') {
          this.router.navigate(['/conductor-dashboard']);
        } else if (response.role === 'pasajero') {
          this.router.navigate(['/pasajero-dashboard']);
        } else {
          this.error = 'Rol de usuario no reconocido.';
        }
      } else {
        this.error = 'Credenciales inválidas';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
