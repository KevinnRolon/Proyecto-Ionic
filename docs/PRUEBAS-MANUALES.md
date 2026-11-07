# Recorrido de pruebas manuales

Ejecutar `npm start` y abrir `http://localhost:4200`. Usar datos ficticios para el perfil. La API y sus cantidades pueden cambiar; no depender de un producto específico.

| Caso | Acción | Resultado esperado |
| --- | --- | --- |
| Navegación | Abrir Productos, Carrito y Perfil | Cambia la pestaña y conserva el carrito |
| Carga | Recargar Productos con conexión lenta | Se anuncia la carga y aparece el indicador |
| Red fallida | Activar modo sin conexión y recargar | Error con botón Reintentar, sin presentar un catálogo vacío como carga exitosa |
| Recuperación | Volver a conectar y reintentar | Se cargan los productos y desaparece el error |
| Búsqueda | Escribir `decoracion` | Encuentra la categoría Decoración sin necesitar tilde |
| Sin coincidencias | Buscar `zzzzsincoincidencias` | Mensaje sin resultados y opción para ver todos |
| Categoría | Elegir una categoría | Se muestran solo productos de esa categoría; etiqueta en español |
| Stock | Activar Solo con stock | Se excluyen los productos cuya cantidad es cero |
| Orden | Elegir Mejor calificación | Las valoraciones aparecen de mayor a menor |
| Precio | Reducir el precio máximo | Se excluyen los precios mayores al máximo |
| Restablecimiento | Pulsar Limpiar filtros | Se borran búsqueda y restricciones, y vuelve el orden por nombre |
| Agregar | Agregar dos unidades del mismo producto | El carrito muestra un producto distinto y dos unidades |
| Límite | Llegar a la cantidad disponible | No se permite seguir agregando ese producto |
| Quitar | Restar hasta cero o pulsar el cesto | Se elimina la línea y se actualiza el total |
| Persistencia | Recargar después de agregar | El carrito se recupera en el mismo navegador |
| Cancelar compra | Finalizar simulación y volver | El carrito permanece igual |
| Confirmar compra | Finalizar simulación y confirmar | Se vacía el carrito y se informa que no hubo compra real |
| Perfil inválido | Guardar sin nombre o con correo incorrecto | Se muestran mensajes específicos y no se guarda |
| Perfil válido | Guardar datos ficticios y recargar | Se recuperan los datos |
| Cancelar borrado | Pulsar Borrar perfil local y cancelar | Los datos se conservan |
| Borrar perfil | Confirmar Borrar perfil local y recargar | Los campos quedan vacíos |
| Teclado | Navegar con Tab y activar con Enter | Se distingue el foco de botones y pestañas |
| Imagen fallida | Bloquear una imagen remota desde las herramientas del navegador | Se muestra el dibujo de respaldo local |

## Límites de estas pruebas

Las pruebas automáticas simulan errores HTTP y datos inválidos, además de verificar filtros y cálculos. Las comprobaciones manuales dependen del navegador y de la respuesta actual de DummyJSON. No equivalen a probar pagos, pedidos o reservas reales, funciones que esta aplicación no implementa.
