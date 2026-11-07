import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { CarritoPage } from './carrito.page';
import { ImagenRespaldoDirective } from '../../directives/imagen-respaldo.directive';

@NgModule({ declarations: [CarritoPage], imports: [CommonModule, IonicModule, ImagenRespaldoDirective, RouterModule.forChild([{ path: '', component: CarritoPage }])] })
export class CarritoPageModule {}
