import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations'; // Importa animaciones

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HomePage {
  constructor(private navCtrl: NavController) { }

  navigateToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  navigateToInicio() {
    this.navCtrl.navigateForward('/inicio');
  }
}
