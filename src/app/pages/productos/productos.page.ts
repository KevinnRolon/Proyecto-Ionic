import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { nombreCategoria } from '../../models/categorias';

@Component({ selector: 'app-productos', templateUrl: './productos.page.html', styleUrls: ['./productos.page.scss'], standalone: false })
export class ProductosPage implements OnInit, OnDestroy {
  readonly nombreCategoria = nombreCategoria;
  productos: Producto[] = [];
  cargando = true;
  error = '';
  busqueda = '';
  categoria = 'todas';
  orden = 'nombre';
  precioMaximo = 0;
  limitePrecio = 0;
  mensaje = '';
  toastAbierto = false;
  private carga?: Subscription;

  constructor(private productosService: ProductosService, public carrito: CarritoService, private cambios: ChangeDetectorRef) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.carga?.unsubscribe();
    this.cargando = true;
    this.error = '';
    this.carga = this.productosService.listar().subscribe({
      next: respuesta => {
        this.productos = respuesta.products;
        this.limitePrecio = Math.ceil(Math.max(0, ...this.productos.map(p => p.price)));
        this.precioMaximo = this.limitePrecio;
        this.cargando = false;
        this.cambios.markForCheck();
      },
      error: () => {
        this.error = 'No pudimos cargar los productos. Revisá tu conexión y volvé a intentar.';
        this.cargando = false;
        this.cambios.markForCheck();
      },
    });
  }

  get categorias(): string[] { return [...new Set(this.productos.map(p => p.category))].sort(); }

  get filtrados(): Producto[] {
    const termino = this.busqueda.trim().toLocaleLowerCase();
    const lista = this.productos.filter(p => (p.title + ' ' + p.description).toLocaleLowerCase().includes(termino) &&
      (this.categoria === 'todas' || p.category === this.categoria) && p.price <= this.precioMaximo);
    return lista.sort((a, b) => this.orden === 'menor' ? a.price - b.price : this.orden === 'mayor' ? b.price - a.price : a.title.localeCompare(b.title));
  }

  limpiar(): void {
    this.busqueda = '';
    this.categoria = 'todas';
    this.orden = 'nombre';
    this.precioMaximo = this.limitePrecio;
  }

  agregar(producto: Producto): void {
    this.mensaje = this.carrito.agregar(producto) ? `${producto.title} se agregó al carrito.` : 'Ya alcanzaste la cantidad disponible de este producto.';
    this.toastAbierto = true;
  }

  ngOnDestroy(): void { this.carga?.unsubscribe(); }
}
