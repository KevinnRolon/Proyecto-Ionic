import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { bagHandleOutline, cartOutline, personCircleOutline, addOutline, removeOutline, trashOutline, checkmarkCircleOutline, arrowForwardOutline, leafOutline, star, refreshOutline } from 'ionicons/icons';

@Component({ selector: 'app-root', template: '<ion-app><ion-router-outlet></ion-router-outlet></ion-app>', standalone: false })
export class AppComponent {
  constructor() {
    addIcons({ bagHandleOutline, cartOutline, personCircleOutline, addOutline, removeOutline, trashOutline, checkmarkCircleOutline, arrowForwardOutline, leafOutline, star, refreshOutline });
  }
}
