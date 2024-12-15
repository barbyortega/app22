import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Simula un retraso de 3 segundos antes de redirigir a la página principal
    setTimeout(() => {
      this.router.navigate(['/home']); // Redirige a la página principal
    }, 3000); // 3000 ms = 3 segundos
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
