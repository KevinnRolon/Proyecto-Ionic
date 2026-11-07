import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-tabs', standalone: false,
  template: `<ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="productos" href="/tabs/productos"><ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon><ion-label>Productos</ion-label></ion-tab-button>
      <ion-tab-button tab="carrito" href="/tabs/carrito"><ion-icon name="cart-outline" aria-hidden="true"></ion-icon><ion-label>Carrito</ion-label>
        @if (carrito.cantidad() > 0) { <ion-badge>{{ carrito.cantidad() }}</ion-badge> }
      </ion-tab-button>
      <ion-tab-button tab="perfil" href="/tabs/perfil"><ion-icon name="person-circle-outline" aria-hidden="true"></ion-icon><ion-label>Perfil</ion-label></ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>`,
})
export class TabsPage {
  constructor(public carrito: CarritoService) {}
}
