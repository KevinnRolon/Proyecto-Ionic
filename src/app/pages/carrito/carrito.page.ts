import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';
import { CarritoService } from '../../services/carrito.service';

@Component({ selector: 'app-carrito', templateUrl: './carrito.page.html', styleUrls: ['./carrito.page.scss'], standalone: false })
export class CarritoPage {
  pedidoSimulado = false;
  constructor(public carrito: CarritoService, private alertas: AlertController) {}

  async confirmar(): Promise<void> {
    if (!this.carrito.cantidad()) return;
    const alerta = await this.alertas.create({
      header: '¿Finalizar la simulación?',
      message: 'No se realizará ningún pago ni envío. Al confirmar se vaciará el carrito.',
      buttons: [
        { text: 'Volver', role: 'cancel' },
        { text: 'Confirmar', handler: () => {
          this.carrito.vaciar();
          this.pedidoSimulado = true;
        } },
      ],
    });
    await alerta.present();
  }

  async vaciar(): Promise<void> {
    const alerta = await this.alertas.create({
      header: '¿Vaciar el carrito?', message: 'Se quitarán todos los productos seleccionados.',
      buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Vaciar', role: 'destructive', handler: () => this.carrito.vaciar() }],
    });
    await alerta.present();
  }
}
