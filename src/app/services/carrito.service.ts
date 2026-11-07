import { computed, Injectable, signal } from '@angular/core';
import { ItemCarrito, Producto } from '../models/producto';

const CLAVE = 'bolsa-urbana-carrito';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly lista = signal<ItemCarrito[]>(this.leer());
  readonly items = this.lista.asReadonly();
  readonly cantidad = computed(() => this.items().reduce((suma, item) => suma + item.cantidad, 0));
  readonly total = computed(() => this.items().reduce((suma, item) => suma + item.producto.price * item.cantidad, 0));
  readonly aviso = signal('');

  agregar(producto: Producto): boolean {
    const actual = this.items().find(item => item.producto.id === producto.id);
    if ((actual?.cantidad ?? 0) >= producto.stock) return false;
    const nuevos = actual
      ? this.items().map(item => item.producto.id === producto.id ? { producto, cantidad: item.cantidad + 1 } : item)
      : [...this.items(), { producto, cantidad: 1 }];
    this.guardar(nuevos);
    return true;
  }

  cambiar(id: number, cantidad: number): void {
    if (!Number.isInteger(cantidad) || cantidad < 0) return;
    this.guardar(this.items().flatMap(item => {
      if (item.producto.id !== id) return [item];
      if (cantidad === 0) return [];
      return [{ ...item, cantidad: Math.min(cantidad, item.producto.stock) }];
    }));
  }

  vaciar(): void { this.guardar([]); }

  private guardar(items: ItemCarrito[]): void {
    this.lista.set(items);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
      this.aviso.set('');
    } catch {
      this.aviso.set('El navegador no permite guardar el carrito. Se conservará solo durante esta sesión.');
    }
  }

  private leer(): ItemCarrito[] {
    try {
      const datos: unknown = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
      if (!Array.isArray(datos)) return [];
      return datos.filter((item): item is ItemCarrito => {
        const p = item?.producto;
        return p && Number.isInteger(p.id) && typeof p.title === 'string' &&
          typeof p.thumbnail === 'string' && Number.isFinite(p.price) && p.price >= 0 &&
          Number.isInteger(p.stock) && p.stock > 0 && Number.isInteger(item.cantidad) &&
          item.cantidad > 0 && item.cantidad <= p.stock;
      });
    } catch { return []; }
  }
}
