import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashScreenComponent } from './splash-screen.component';
import { IonicModule } from '@ionic/angular';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashScreenComponent ],
      imports: [ IonicModule.forRoot() ] // Importa IonicModule para las dependencias de Ionic
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí, dependiendo de la lógica de tu componente
});
