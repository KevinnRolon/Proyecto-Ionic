const NOMBRES: Record<string, string> = {
  beauty: 'Belleza', fragrances: 'Perfumes', furniture: 'Muebles', groceries: 'Alimentos',
  'home-decoration': 'Decoración', 'kitchen-accessories': 'Cocina', laptops: 'Notebooks',
  'mens-shirts': 'Camisas', 'mens-shoes': 'Calzado masculino', 'mens-watches': 'Relojes masculinos',
  'mobile-accessories': 'Accesorios de celulares', motorcycle: 'Motocicletas',
  'skin-care': 'Cuidado de la piel', smartphones: 'Celulares', 'sports-accessories': 'Deportes',
  sunglasses: 'Anteojos de sol', tablets: 'Tablets', tops: 'Blusas', vehicle: 'Vehículos',
  'womens-bags': 'Bolsos', 'womens-dresses': 'Vestidos', 'womens-jewellery': 'Joyería',
  'womens-shoes': 'Calzado femenino', 'womens-watches': 'Relojes femeninos',
};

export function nombreCategoria(categoria: string): string {
  return NOMBRES[categoria] ?? categoria;
}
