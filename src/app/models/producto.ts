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
