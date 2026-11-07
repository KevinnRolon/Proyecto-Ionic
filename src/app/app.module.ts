import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular/lazy';
import { AppComponent } from './app.component';
import { TabsPage } from './tabs/tabs.page';

@NgModule({
  declarations: [AppComponent, TabsPage],
  imports: [BrowserModule, IonicModule.forRoot(), RouterModule.forRoot([
    { path: 'tabs', component: TabsPage, children: [
      { path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosPageModule) },
      { path: 'carrito', loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoPageModule) },
      { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule) },
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
    ] },
    { path: '', redirectTo: 'tabs/productos', pathMatch: 'full' },
    { path: '**', redirectTo: 'tabs/productos' },
  ])],
  providers: [provideHttpClient(), { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
