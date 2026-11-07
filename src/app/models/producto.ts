export interface Producto {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export interface RespuestaProductos {
  products: Producto[];
  total: number;
  skip: number;
  limit: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export function esRespuestaProductos(datos: unknown): datos is RespuestaProductos {
  if (!datos || typeof datos !== 'object') return false;
  const respuesta = datos as Record<string, unknown>;
  return ['total', 'skip', 'limit'].every(campo => Number.isInteger(respuesta[campo]) && (respuesta[campo] as number) >= 0) &&
    Array.isArray(respuesta['products']) && respuesta['products'].every((producto: unknown) => {
      if (!producto || typeof producto !== 'object') return false;
      const p = producto as Record<string, unknown>;
      return Number.isInteger(p['id']) && (p['id'] as number) > 0 &&
        ['title', 'description', 'category', 'thumbnail'].every(campo => typeof p[campo] === 'string') &&
        typeof p['price'] === 'number' && Number.isFinite(p['price']) && p['price'] >= 0 &&
        typeof p['rating'] === 'number' && Number.isFinite(p['rating']) && p['rating'] >= 0 && p['rating'] <= 5 &&
        Number.isInteger(p['stock']) && (p['stock'] as number) >= 0;
    });
}
