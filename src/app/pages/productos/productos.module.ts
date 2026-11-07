import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { ProductosPage } from './productos.page';

@NgModule({
  declarations: [ProductosPage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: ProductosPage }])],
})
export class ProductosPageModule {}
