# Lo primero:

Mira el video, explico un poco el contexto, luego, lo siento por el desastre, tercero, disfruta de esta obra audiovisual que he hecho en 3 semanas de sufrimiento y placer por partes iguales, es como un hijo, pero con problemitas.

# Indicaciones:

Lo del github Pages, que empieza en el 404 por que no funcionaba netlify ni vercel, así que hice eso como pude, y si cargas otra cosa, las rutas, no funcionan.

Luego, cualquier duda, en clase te resuelvo esta fumada con miles de cosas que aún ni yo, habiéndolo hecho, entiendo.

Algunas cosas funcionan por que cristo quiere y chatGPT.

Además con una captura en assets de que valido la página en w3c y dice que no hay errores (No me lo creo).

# Diseño de la Barra de Navegación

## Introducción
En este proyecto, la barra de navegación (navbar) es uno de los componentes clave que facilita la interacción del usuario con la aplicación. A continuación, se detalla todo el proceso de diseño de la barra de navegación, las decisiones tomadas, los componentes utilizados y los desafíos que enfrenté a lo largo del proceso.

## Decisiones de Diseño

### 1. **Estructura y Layout**
La barra de navegación está diseñada para ser flexible y adaptarse a diferentes tamaños de pantalla. Utilicé `flexbox` para asegurarnos de que todos los elementos estén alineados de manera adecuada, sin importar el tamaño de la pantalla. La barra tiene los siguientes elementos:

- **Logo:** A la izquierda, permite una navegación rápida a la página principal.
- **Menú:** Contiene las opciones principales de navegación, con un `dropdown` que permite la selección de opciones adicionales.
- **Búsqueda:** Un campo de entrada de búsqueda que se adapta al espacio disponible.
- **Autenticación:** Los botones para login o registro están al final de la barra, visibles de forma destacada.
- **Selección de Tema:** Un botón que permite cambiar entre temas claros y oscuros, mejorando la accesibilidad del sitio.

La barra de navegación es 100% flexible, adaptándose bien a pantallas grandes y pequeñas gracias a las reglas CSS específicas dentro de las media queries.

### 2. **Interactividad**
La barra de navegación incluye varios efectos visuales para mejorar la experiencia del usuario:

- **Efectos Hover:** Los botones y enlaces cambian de color y tienen una ligera animación al pasar el cursor sobre ellos para mejorar la interacción.
- **Animación de Escala:** Los botones y los elementos del menú tienen un efecto de "zoom" al hacer clic o al pasar el cursor, lo que mejora la experiencia de usuario al hacerla más dinámica.
- **Cambio de Tema:** Utilizando un `dropdown`, el usuario puede seleccionar entre un tema claro y un tema oscuro. Al hacer esto, la clase correspondiente se aplica a la barra de navegación, cambiando su color y el de los elementos asociados. Esto permite una personalización visual según las preferencias del usuario.

### 3. **Adaptabilidad**
Para asegurarme de que la barra de navegación se vea bien en diferentes dispositivos, implementé reglas CSS específicas para pantallas más pequeñas (bajo 768px), donde la barra se reorganiza en una disposición vertical y los elementos de la barra de navegación se ajustan automáticamente.

## Componentes Utilizados

- **Navbar (Contenedor Principal)** Este es el contenedor principal de la barra de navegación. Está alineado utilizando `flexbox` y contiene los siguientes elementos:
  - Logo
  - Menú
  - Campo de búsqueda
  - Autenticación
  - Selección de Tema

## Menú Desplegable (Dropdown)
Este componente contiene opciones de navegación adicionales. Se muestra al hacer clic en el botón correspondiente y permite la navegación a secciones secundarias. La animación de deslizamiento y la sombra agregan un toque visual atractivo.

## Campo de Búsqueda
Implementado como un campo de texto con un borde sutil y un enfoque de estilo cuando el usuario interactúa con él. El campo de búsqueda es completamente responsivo, adaptándose a la pantalla de manera flexible.

## Botones de Autenticación
Los botones de inicio de sesión y registro son fáciles de encontrar, con colores contrastantes que resaltan sobre el fondo de la barra de navegación. También tienen un efecto de hover para mejorar la interacción.

## Selección de Tema
Este componente permite al usuario cambiar entre un tema claro y oscuro. Está implementado mediante un botón que despliega un menú con opciones para seleccionar el tema preferido. Utilicé animaciones para hacer la interacción más fluida y atractiva.

## Desafíos Encontrados

### 1. Cambio Dinámico de Tema
Uno de los desafíos más importantes fue permitir que la barra de navegación y sus elementos cambien dinámicamente de color cuando se selecciona un tema claro u oscuro. Inicialmente, probé cambiar los colores directamente con JavaScript, pero esto causaba algunos problemas de rendimiento y de renderizado en ciertos navegadores. Finalmente, decidí aplicar clases CSS a la barra de navegación y sus elementos y cambiar esas clases a través de JavaScript, lo que permitió una transición más suave y eficiente.

### 2. Compatibilidad entre Navegadores
Otro desafío fue asegurar que la barra de navegación se viera correctamente en diferentes navegadores, especialmente en los más antiguos como Internet Explorer. Tuve que realizar algunos ajustes en los `box-sizing` y en el uso de `flexbox` para garantizar que la barra se viera bien en todos los casos.

### 3. Responsividad
Hacer que la barra de navegación fuera completamente responsiva, especialmente en dispositivos móviles, fue un reto. Asegurarme de que los elementos como el menú y la barra de búsqueda se ajustaran correctamente a pantallas pequeñas fue algo que requirió varias pruebas y ajustes. Finalmente, logré que el diseño fuera flexible utilizando `media queries` y ajustando el espaciado y las proporciones.

### 4. Interacción en Dispositivos Táctiles
Para la funcionalidad de selección del tema, enfrenté el reto de que en dispositivos táctiles el hover no era tan efectivo. Para solucionarlo, cambié algunos efectos de hover a efectos de click, asegurando que los usuarios táctiles pudieran interactuar sin problemas.

## Conclusión
El diseño de la barra de navegación fue un desafío, pero al final logró ser funcional y atractiva. Implementé efectos visuales y animaciones que no solo mejoran la estética, sino que también contribuyen a una mejor experiencia de usuario. La barra se adapta bien a diferentes tamaños de pantalla y permite una fácil navegación, lo que mejora la accesibilidad y la usabilidad del sitio.

Estoy muy satisfecho con los resultados y, a pesar de los desafíos encontrados, cada uno de ellos fue una oportunidad de aprender y mejorar mis habilidades de diseño web.
