# Guía para entender Bolsa Urbana

## El recorrido de los datos

1. `AppModule` define las rutas y habilita HTTP y los componentes Ionic.
2. `TabsPage` muestra tres destinos. Cada página se carga cuando se necesita mediante `loadChildren`.
3. Al abrir Productos, Angular ejecuta `ngOnInit()`, que llama a `cargar()`.
4. `ProductosService.listar()` lee la URL de `environment` y devuelve un `Observable` HTTP.
5. Mientras la petición está pendiente, `cargando` muestra `ion-spinner`. La suscripción recibe el JSON o activa el mensaje de error.
6. `filtrados` combina texto, categoría y precio, y ordena una lista nueva. `@for` crea una tarjeta por producto y usa su `id` para identificarla.
7. El botón Agregar pasa el producto a `CarritoService`, una instancia compartida por todas las páginas.
8. El servicio usa una señal para sus artículos y valores calculados para unidades y total. Cada cambio guarda una copia en el navegador.

## Qué hace cada parte

- **Interfaz de TypeScript:** describe la forma esperada del producto. No descarga datos ni valida automáticamente lo recibido de Internet.
- **Servicio:** concentra una responsabilidad compartida. Evita que cada página mantenga un carrito diferente o repita la petición HTTP.
- **Inyección por constructor:** Angular entrega las dependencias declaradas en los parámetros del constructor.
- **Observable y suscripción:** representan y reciben la respuesta asíncrona. `unsubscribe()` cancela una carga anterior o la suscripción cuando se destruye la página.
- **`ChangeDetectorRef.markForCheck()`:** avisa a Angular que actualice la página tras la respuesta HTTP en esta configuración sin Zone.js.
- **`signal`:** estado que Angular puede observar; `computed` vuelve a calcular el total cuando cambian los artículos.
- **Bindings:** `[src]` asigna la imagen; `(click)` ejecuta una acción; `[(ngModel)]` vincula los filtros con sus controles.
- **Formulario reactivo:** agrupa valores y validadores. Un nombre vacío o solo espacios y un correo inválido impiden guardar.
- **`localStorage`:** guarda cadenas por origen en el navegador. Por eso se serializa con `JSON.stringify` y se recupera con `JSON.parse` dentro de `try/catch`.
- **Alerta de simulación:** no llama a un servidor de pedidos. Solo confirma con el usuario y vacía el estado local.

## Comprobaciones que deberías saber explicar

1. Agregar dos veces un producto de USD 12,50 da dos unidades y USD 25,00. Son unidades, no cantidad de productos diferentes.
2. Una cantidad no puede superar el stock de demostración; al restar hasta cero, se elimina el artículo.
3. Una búsqueda que no coincide devuelve una lista vacía y muestra un mensaje.
4. Si la petición falla, no se informa que el catálogo está vacío: se muestra el error y se permite reintentar.
5. Recargar recupera los datos del mismo navegador. Otro dispositivo no comparte ese almacenamiento.
6. El perfil no crea una cuenta ni autentica a nadie.

## Ejercicios para trabajar personalmente

Realizarlos después de entender la base, verificarlos y registrar los cambios verdaderos en `IA.md`:

- Explicar con tus palabras por qué existe un servicio para productos y otro para el carrito.
- Agregar una traducción nueva al mapa `models/categorias.ts`, conservando el valor original para filtrar.
- Agregar un filtro de calificación mínima y comprobar cómo se combina con el precio.
- Explicar cómo funciona la confirmación de Borrar perfil local y por qué cancelar conserva los datos.
- Cambiar la identidad visual con decisiones propias y capturas nuevas.

Estos ejercicios no aseguran ningún resultado de un detector ni convierten automáticamente código asistido en código propio. La finalidad es comprender, aportar cambios reales y poder defender las decisiones.

## Mejoras del segundo recorrido

La búsqueda normaliza el texto para ignorar tildes y también consulta las etiquetas de categorías en español. El filtro Solo con stock se combina con los filtros anteriores. El orden por calificación usa el nombre para desempatar.

El total se suma en centavos enteros antes de convertirlo a dólares; de ese modo, sumar 0,10 y 0,20 produce exactamente 0,30. La recuperación del carrito ignora registros duplicados. El servicio HTTP valida el formato del JSON recibido, porque declarar una interfaz de TypeScript no valida datos externos durante la ejecución.

La directiva `ImagenRespaldoDirective` escucha el error de una imagen y usa un archivo SVG local; su marca de respaldo evita reintentar indefinidamente si también falla ese archivo.

El [recorrido de pruebas manuales](PRUEBAS-MANUALES.md) permite comprobar estas decisiones paso a paso.
