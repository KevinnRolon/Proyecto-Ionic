import { CarritoService } from './carrito.service';
import { Producto } from '../models/producto';

const producto: Producto = { id: 1, title: 'Producto de prueba', price: 12.5, stock: 2, category: 'test', description: '', thumbnail: '', rating: 4 };

describe('CarritoService', () => {
  beforeEach(() => localStorage.clear());

  it('suma los precios en centavos sin arrastrar errores de punto flotante', () => {
    const carrito = new CarritoService();
    carrito.agregar({ ...producto, price: 0.1 });
    carrito.agregar({ ...producto, id: 2, price: 0.2 });
    expect(carrito.total()).toBe(0.3);
  });

  it('limita las unidades al stock y calcula el total', () => {
    const carrito = new CarritoService();
    expect(carrito.agregar(producto)).toBe(true);
    expect(carrito.agregar(producto)).toBe(true);
    expect(carrito.agregar(producto)).toBe(false);
    expect(carrito.cantidad()).toBe(2);
    expect(carrito.total()).toBe(25);
    carrito.cambiar(1, 500);
    expect(carrito.cantidad()).toBe(2);
  });

  it('recupera las cantidades y elimina el artículo al llegar a cero', () => {
    const carrito = new CarritoService();
    carrito.agregar(producto);
    const recuperado = new CarritoService();
    expect(recuperado.total()).toBe(12.5);
    recuperado.cambiar(1, 0);
    expect(recuperado.items()).toEqual([]);
    expect(new CarritoService().items()).toEqual([]);
  });

  it('descarta datos guardados corruptos o cantidades inválidas', () => {
    localStorage.setItem('bolsa-urbana-carrito', 'JSON roto');
    expect(new CarritoService().items()).toEqual([]);
    localStorage.setItem('bolsa-urbana-carrito', JSON.stringify([{ producto, cantidad: -2 }, { producto, cantidad: 3 }]));
    expect(new CarritoService().items()).toEqual([]);
  });

  it('conserva el carrito en memoria si falla el almacenamiento', () => {
    const carrito = new CarritoService();
    const escritura = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Sin espacio'); });
    try {
      carrito.agregar(producto);
      expect(carrito.cantidad()).toBe(1);
      expect(carrito.aviso()).toContain('solo durante esta sesión');
    } finally { escritura.mockRestore(); }
  });
});
