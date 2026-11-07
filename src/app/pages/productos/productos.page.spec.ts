import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Producto, RespuestaProductos } from '../../models/producto';
import { CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';
import { ProductosPage } from './productos.page';

const productos: Producto[] = [
  { id: 1, title: 'Lámpara', description: 'Luz cálida', category: 'home-decoration', price: 20, stock: 2, rating: 4, thumbnail: '' },
  { id: 2, title: 'Almohadón', description: 'Algodón', category: 'home-decoration', price: 10, stock: 0, rating: 5, thumbnail: '' },
  { id: 3, title: 'Celular', description: 'Pantalla grande', category: 'smartphones', price: 300, stock: 5, rating: 4.5, thumbnail: '' },
];

describe('Filtros y carga de ProductosPage', () => {
  let respuesta: Subject<RespuestaProductos>;
  let pagina: ProductosPage;
  beforeEach(() => {
    localStorage.clear();
    respuesta = new Subject<RespuestaProductos>();
    TestBed.configureTestingModule({ providers: [{ provide: ProductosService, useValue: { listar: () => respuesta.asObservable() } }] });
    pagina = new ProductosPage(TestBed.inject(ProductosService), new CarritoService(), { markForCheck: vi.fn() } as unknown as ChangeDetectorRef);
    pagina.ngOnInit();
  });
  afterEach(() => pagina.ngOnDestroy());

  function cargar(): void { respuesta.next({ products: productos, total: 3, skip: 0, limit: 3 }); }

  it('sale del estado de carga al recibir datos y combina categoría, precio y stock', () => {
    expect(pagina.cargando).toBe(true);
    cargar();
    expect(pagina.cargando).toBe(false);
    pagina.categoria = 'home-decoration';
    pagina.precioMaximo = 25;
    pagina.soloDisponibles = true;
    expect(pagina.filtrados.map(p => p.id)).toEqual([1]);
    pagina.precioMaximo = 15;
    expect(pagina.filtrados).toEqual([]);
  });

  it('encuentra nombres sin tildes y categorías traducidas, y permite limpiar filtros', () => {
    cargar();
    pagina.busqueda = '  lampara  ';
    expect(pagina.filtrados.map(p => p.id)).toEqual([1]);
    pagina.busqueda = 'decoracion';
    expect(pagina.filtrados).toHaveLength(2);
    pagina.soloDisponibles = true;
    pagina.limpiar();
    expect(pagina.filtrados).toHaveLength(3);
    expect(pagina.soloDisponibles).toBe(false);
  });

  it('ordena por precio y calificación sin cambiar la lista original', () => {
    cargar();
    pagina.orden = 'menor';
    expect(pagina.filtrados.map(p => p.id)).toEqual([2, 1, 3]);
    pagina.orden = 'calificacion';
    expect(pagina.filtrados.map(p => p.id)).toEqual([2, 3, 1]);
    expect(productos.map(p => p.id)).toEqual([1, 2, 3]);
  });

  it('muestra el error y permite reintentar una carga fallida', () => {
    respuesta.error(new Error('Sin conexión'));
    expect(pagina.cargando).toBe(false);
    expect(pagina.error).toContain('Revisá tu conexión');
    respuesta = new Subject<RespuestaProductos>();
    pagina.cargar();
    expect(pagina.error).toBe('');
    cargar();
    expect(pagina.productos).toHaveLength(3);
  });
});
