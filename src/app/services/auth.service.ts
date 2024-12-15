import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  email: string;
  password: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsers = [
    { email: 'isa@gmail.com', password: '1630', name: 'Isa Alvarado', role: 'conductor' },
    { email: 'raquel@gmail.com', password: '1996', name: 'Raquel Rehbein', role: 'conductor' },
    { email: 'martina@gmail.com', password: '2024', name: 'Martina González', role: 'pasajero' }
  ];

  constructor() {}

  // Método para registrar usuarios
  registrar(nombre: string, correo: string, contrasena: string, rol: string): Observable<any> {
    if (!this.esContrasenaValida(contrasena)) {
      return of({ success: false, message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    const userData: User = { email: correo, password: contrasena, name: nombre, role: rol };

    // Simulación de guardado de usuario en el almacenamiento local
    const response = { success: true, name: nombre };

    if (response.success) {
      // Guardar el usuario en localStorage
      const usuariosRegistrados = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      usuariosRegistrados.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(usuariosRegistrados));
    }

    return of(response);
  }

  // Método para manejar el inicio de sesión (validación local)
  login(email: string, password: string): Observable<{ success: boolean, role: string, name?: string }> {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
    // Buscar el usuario en ambos arrays (validUsers y usuarios registrados)
    const user = [...this.validUsers, ...usuariosRegistrados].find(
      user => user.email === email && user.password === password
    );
  
    if (user) {
      // Limpiar el localStorage antes de guardar los datos del nuevo usuario
      this.clearStorage();
  
      // Guardamos la información del usuario en el localStorage
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userEmail', user.email); // Agregar el correo también
      localStorage.setItem('userPassword', user.password); // Agregar la contraseña también
      console.log('User logged in:', { name: user.name, role: user.role });
      return of({ success: true, role: user.role, name: user.name });
    } else {
      console.log('Login failed for:', email);
      return of({ success: false, role: '', name: '' });
    }
  }
  

  // Método para cerrar sesión
  logout(): Observable<void> {
    this.clearStorage(); // Llamar al método para limpiar el almacenamiento
    return of(); // Retornamos un observable vacío
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userName');
  }

  // Método para obtener el nombre del usuario
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  // Método para obtener el rol del usuario
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Método para obtener la información del usuario logueado
  obtenerUsuarioLogueado(): Observable<{ name: string | null, role: string | null }> {
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');
    return of({ name, role });
  }

  // Método para actualizar el perfil del usuario
  actualizarPerfil(nombre: string): Observable<any> {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Verificar que los usuarios registrados no estén vacíos
    if (usuariosRegistrados.length === 0) {
      console.log('No se encontraron usuarios registrados en el localStorage');
      return of({ success: false, message: 'No se encontraron usuarios registrados' });
    }

    // Buscar el índice del usuario con el correo proporcionado
    const userIndex = usuariosRegistrados.findIndex((user: User) => user.email === localStorage.getItem('userEmail'));

    // Si el usuario no se encuentra
    if (userIndex === -1) {
      console.log('Usuario no encontrado para actualizar');
      return of({ success: false, message: 'Usuario no encontrado' });
    }

    // Si el usuario se encuentra, actualizamos solo el nombre
    usuariosRegistrados[userIndex].name = nombre;

    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(usuariosRegistrados));

    // También actualizamos el nombre en localStorage para reflejar el cambio
    localStorage.setItem('userName', nombre);

    console.log('Perfil actualizado:', { name: nombre });
    return of({ success: true, name: nombre });
  }

  // Método para cambiar la contraseña del usuario
  cambiarContrasena(email: string, nuevaContrasena: string): Observable<any> {
    // Obtener la lista de usuarios registrados desde localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Buscar al usuario que desea cambiar la contraseña
    const userIndex = usuariosRegistrados.findIndex((user: User) => user.email === email);
    
    if (userIndex === -1) {
      return of({ success: false, message: 'Usuario no encontrado' });
    }
    
    // Actualizamos la contraseña del usuario
    usuariosRegistrados[userIndex].password = nuevaContrasena;
    
    // Guardar los cambios en el localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(usuariosRegistrados));
    
    // También actualizamos la contraseña en el localStorage de la sesión activa
    localStorage.setItem('userPassword', nuevaContrasena);
    
    console.log('Contraseña actualizada correctamente para el usuario:', email);
    return of({ success: true, message: 'Contraseña actualizada con éxito' });
  }

  // Método para limpiar el almacenamiento
  private clearStorage(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail'); // Eliminar el email de la sesión
    localStorage.removeItem('userPassword'); // Eliminar la contraseña de la sesión
  }

  // Método para validar la contraseña (al menos 6 caracteres)
  private esContrasenaValida(contrasena: string): boolean {
    return contrasena.length >= 6;
  }
}
