import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  perfil = {
    nombre: '',
    correo: '',
    foto: '',
    contrasena: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.cargarPerfil();
  }

  // Cargar los datos del perfil desde localStorage o de la sesión
  cargarPerfil() {
    // Obtenemos los datos del usuario desde localStorage
    this.perfil.nombre = localStorage.getItem('userName') || '';
    this.perfil.correo = localStorage.getItem('userEmail') || ''; // Correo solo de lectura
    this.perfil.contrasena = localStorage.getItem('userPassword') || ''; // Contraseña solo de lectura
    this.perfil.foto = localStorage.getItem('userFoto') || ''; // Foto (si la tienes almacenada)
  }

  // Abrir la cámara para tomar una nueva foto
  async abrirCamara() {
    const imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (imagen && imagen.dataUrl) {
      this.perfil.foto = imagen.dataUrl;  // Asignar la foto al objeto perfil
      localStorage.setItem('userFoto', imagen.dataUrl); // Guardar foto en localStorage
    }
  }

  // Guardar el perfil actualizado en localStorage
  guardarPerfil() {
    if (!this.perfil.nombre) {
      alert('Por favor, complete el nombre.');
      return;
    }

    // Guardamos solo el nombre (el correo y la contraseña no deben actualizarse)
    localStorage.setItem('userName', this.perfil.nombre);
    alert('¡Perfil actualizado con éxito!');
  }


  volver() {
    this.router.navigate(['/conductor-dashboard']); // Cambia '/pagina-anterior' por la ruta a la que deseas redirigir
  }
}
