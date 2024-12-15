import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true), // Mock del método
      getUserRole: jasmine.createSpy('getUserRole').and.returnValue('conductor') // Mock del rol
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate') // Mock del método navigate
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock }, // Proporciona el mock del servicio
        { provide: Router, useValue: routerMock } // Proporciona el mock del router
      ]
    });

    authGuard = TestBed.inject(AuthGuard); // Inyecta el guard
    authService = TestBed.inject(AuthService); // Inyecta el servicio
    router = TestBed.inject(Router); // Inyecta el router
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the route for authenticated users with the correct role', () => {
    const result = authGuard.canActivate({ data: { role: 'conductor' } } as any, {} as any);
    expect(result).toBeTrue(); // Asegúrate de que el resultado sea verdadero
  });

  it('should redirect to not-found for unauthenticated users', () => {
    const authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false), // Mock del método para no autenticado
      getUserRole: jasmine.createSpy('getUserRole').and.returnValue('') // Mock del rol
    };

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock }); // Reemplaza el servicio

    const result = authGuard.canActivate({ data: {} } as any, {} as any);
    expect(result).toBeFalse(); // Asegúrate de que el resultado sea falso
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']); // Asegúrate de que redirija
  });

  it('should redirect to not-found for users with the wrong role', () => {
    const authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true), // Mock del método
      getUserRole: jasmine.createSpy('getUserRole').and.returnValue('pasajero') // Rol incorrecto
    };

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock }); // Reemplaza el servicio

    const result = authGuard.canActivate({ data: { role: 'conductor' } } as any, {} as any);
    expect(result).toBeFalse(); // Asegúrate de que el resultado sea falso
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']); // Asegúrate de que redirija
  });
});
