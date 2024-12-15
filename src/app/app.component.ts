
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Asegúrate de importar AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Solicitar Viaje', url: '/solicitar-viaje', icon: 'car' },
    { title: 'Historial de Viajes', url: '/historial-viajes', icon: 'time' },
    { title: 'Ajustes de Perfil', url: '/perfil-ajustes', icon: 'settings' },
    { title: 'Contactar Soporte', url: '/soporte', icon: 'help-circle' },
    { title: 'Acerca de', url: '/acerca-de', icon: 'information-circle' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' }, // Opción para cerrar sesión
  ];
  public labels = ['Seguridad', 'Confiabilidad', 'Rapidez', 'Comunidad'];

  showSplash: boolean = true; // Controla la visualización de la pantalla de presentación

  constructor(private router: Router, private authService: AuthService) {} // Inyecta AuthService

  ngOnInit() {
    // Simula un tiempo de carga de 3 segundos
    setTimeout(() => {
      this.showSplash = false;

      // Verifica si el usuario está autenticado
      if (this.authService.isAuthenticated()) {
        const userRole = this.authService.getUserRole();
        
        // Redirige según el rol del usuario
        if (userRole === 'conductor') {
          this.router.navigate(['/conductor-dashboard']);
        } else if (userRole === 'pasajero') {
          this.router.navigate(['/pasajero-dashboard']);
        } else {
          this.router.navigate(['/home']); // Redirige a home si no hay un rol válido
        }
      } else {
        this.router.navigate(['/home']); // Redirige a la página principal si no está autenticado
      }
    }, 3000); // Cambia el tiempo según sea necesario
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']); // Redirige a la página principal al cerrar sesión
    });
  }
}
