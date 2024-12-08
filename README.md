# Genshin_Api

Enlace a la página: https://crownlesstune.github.io/Genshin_Api/

# Primera entrega: 

## 1. Idea de la Aplicación
La aplicación es una plataforma híbrida entre una wiki/guía y una red social enfocada en el juego **Genshin Impact**. Su propósito es ofrecer una experiencia de usuario integral para los fanáticos del juego, quienes podrán consultar información detallada sobre los personajes, así como interactuar en una comunidad donde podrán crear y compartir contenido, publicar posts y comentar. De esta forma, la aplicación cubre tanto la necesidad de información precisa sobre el juego como el deseo de interacción social.

## 2. Audiencia Objetivo
Esta aplicación está destinada a jugadores de **Genshin Impact** de todas las edades y niveles de habilidad, desde principiantes que buscan aprender sobre los personajes hasta jugadores experimentados que desean compartir sus estrategias y experiencias. La comunidad podrá beneficiarse de un espacio donde acceder a información detallada y actualizada, además de la oportunidad de participar en una comunidad activa e interactiva.

## 3. Análisis de Mercado
Existen otras plataformas como wikis o sitios de foros sobre **Genshin Impact**. Sin embargo, estas no suelen combinar la información con funcionalidades sociales al estilo de una red social. A diferencia de aplicaciones similares, nuestra plataforma destacará por:

- **Funcionalidad social**: posibilidad de crear y comentar publicaciones, dándole a la comunidad una voz dentro de la plataforma.
- **Contenido actualizado en tiempo real**: aprovechando la API de **Genshin Impact** para ofrecer la información más reciente sobre personajes, habilidades y eventos del juego.
- **Interfaz intuitiva**: una experiencia de usuario simple y amigable, basada en el diseño visual inspirado en los gráficos del juego.

## 4. Funcionalidades Clave
Las principales funcionalidades de la aplicación son:

- **Wiki de personajes**: sección dedicada a la descripción de los personajes del juego, con detalles sobre sus habilidades, armas y estadísticas.
- **Sección de guías**: donde los usuarios pueden consultar o subir guías sobre estrategias y mecánicas del juego.
- **Red social integrada**: los usuarios pueden crear perfiles personalizados, crear y compartir publicaciones, así como comentar las publicaciones de otros, similar a una plataforma como Instagram.
- **Sistema de búsqueda y filtrado**: para localizar personajes o publicaciones específicas de forma rápida.
- **Selección de temas**: personalización por temas para la decoración de la página web.

## 5. Tecnologías a Utilizar
Para el desarrollo de la aplicación, hemos seleccionado las siguientes tecnologías:

- **React**: para la construcción de una interfaz de usuario dinámica y modular.
- **JavaScript**: como lenguaje principal para la programación del frontend, permitiendo una interacción rápida y fluida.
- **Bootstrap**: para facilitar un diseño responsive y consistente.
- **Figma**: herramienta de diseño colaborativa para la creación de wireframes y prototipos de la interfaz.
- **API REST de Genshin Impact**: fuente de datos que proporciona información actualizada y precisa sobre el contenido del juego.

 *Ver como implementar:
- **Firebase**: para autenticación de usuarios, almacenamiento de datos en tiempo real y hosting de la aplicación, permitiendo una gestión simplificada de datos y autenticación sin necesidad de backend adicional.


# Cuarta Entrega:

# Genshin_Api

## Índice de Contenido

1. [Portada](#portada)
2. [Introducción](#introducción)
   - [Expectativas y Objetivos](#expectativas-y-objetivos)
   - [Antecedentes](#antecedentes)
   - [Tecnologías](#tecnologías)
3. [Descripción](#descripción)
4. [Instalación y Preparación](#instalación-y-preparación)
5. [Guía de Estilos y Prototipado](#guía-de-estilos-y-prototipado)
6. [Desarrollo](#desarrollo)
7. [Despliegue](#despliegue)
8. [Demo de la Aplicación](#demo-de-la-aplicación)
9. [Conclusiones](#conclusiones)
10. [Bibliografía y Referencias](#bibliografía-y-referencias)

---

## Portada

**Genshin_Api** es una plataforma híbrida entre una wiki/guía y una red social enfocada en el juego **Genshin Impact**. Esta aplicación tiene como objetivo proporcionar una experiencia completa para los jugadores, permitiéndoles consultar información detallada sobre los personajes y habilidades, mientras interactúan con otros jugadores mediante comentarios, publicaciones y más. La aplicación utiliza datos de la **API de Genshin Impact** para ofrecer contenido actualizado sobre el juego.

---

## Introducción

### Expectativas y Objetivos

El objetivo principal de este proyecto es crear una plataforma que combine dos mundos: la búsqueda de información detallada sobre **Genshin Impact** y una red social para fomentar la interacción entre los jugadores. Se espera que los usuarios puedan acceder fácilmente a guías y descripciones de personajes, al mismo tiempo que puedan participar activamente en la comunidad mediante la creación de publicaciones, comentarios y estrategias compartidas.

**Expectativas**:

- Ofrecer una plataforma accesible y fácil de usar.
- Proporcionar una experiencia inmersiva en la que los jugadores puedan aprender y compartir información.
- Permitir la interacción entre los jugadores para fortalecer la comunidad.

### Antecedentes

Existen diversas plataformas dedicadas a **Genshin Impact**, como wikis y foros. Sin embargo, muchas de estas plataformas no permiten una interacción significativa entre los usuarios. Algunas aplicaciones similares incluyen:

### Tecnologías

En el desarrollo de este proyecto, se emplearon diversas tecnologías y herramientas para asegurar la eficiencia, calidad y escalabilidad de la aplicación. A continuación se detallan las tecnologías clave utilizadas:

- **React**: Framework principal para la construcción de la interfaz de usuario. Nos permitió crear componentes reutilizables y manejar el estado de la aplicación de manera eficiente.
- **Vite**: Herramienta de desarrollo que se utilizó como bundler, ofreciendo un proceso de construcción más rápido y optimización de recursos.
- **Firebase**: Para la autenticación de usuarios, almacenamiento en tiempo real y hosting de la aplicación. Firebase nos proporcionó una solución sencilla para manejar datos de usuario y almacenar información de manera segura.
- **Axios**: Librería para hacer peticiones HTTP, utilizada para conectar la aplicación con la **API de Genshin Impact** y obtener los datos relacionados con los personajes.
- **Formik**: Biblioteca para la gestión de formularios. Se utilizó para crear formularios de registro e inicio de sesión, facilitando la validación de datos y la gestión del estado del formulario.
- **SweetAlert2**: Biblioteca para mostrar alertas y notificaciones atractivas. Se utilizó para notificar a los usuarios sobre diferentes eventos en la aplicación, como el éxito o error al iniciar sesión, agregar un comentario, etc.
- **React Router**: Para la navegación entre páginas, permitiendo la creación de rutas y la gestión de la navegación dentro de la aplicación.
- **CSS Modules** y **Sass/SCSS**: Para la creación de estilos personalizados. Se utilizó Sass para mejorar la modularidad de los estilos y asegurar que fueran reutilizables y fáciles de mantener.
- **Git** y **GitHub**: Para el control de versiones y la gestión del código fuente. GitHub fue usado como repositorio principal para almacenar el código y realizar las revisiones colaborativas.
- **GitHub Pages**: Utilizado para el despliegue de la aplicación de forma gratuita, permitiendo que la aplicación sea accesible públicamente desde un navegador.


- **Genshin Impact Wiki**: Proporciona información detallada sobre el juego, pero no tiene funcionalidades sociales.
- **Reddit y otros foros**: Ofrecen discusiones y publicaciones, pero carecen de una integración fluida con la información del juego.
- **Fanmade Websites**: Algunos sitios creados por fanáticos ofrecen guías, pero no integran una comunidad activa ni acceso directo a los datos del juego.

**Genshin_Api** se destaca al combinar lo mejor de ambos mundos: acceso directo a información actualizada del juego junto con una comunidad activa de jugadores.

---

## Descripción

**Genshin_Api** es una aplicación web que proporciona información detallada sobre personajes, habilidades, armas y eventos de **Genshin Impact** a través de una API REST. Además, cuenta con funcionalidades sociales como la creación de publicaciones, la posibilidad de comentar y la interacción entre los usuarios.

### Funcionalidades Clave:

- **Wiki de personajes**: Información sobre los personajes, incluidas estadísticas, habilidades, armas y más.
- **Guías**: Los usuarios pueden crear y consultar guías relacionadas con las estrategias y mecánicas del juego.
- **Red social**: Los usuarios pueden crear perfiles, publicar contenido y comentar en las publicaciones de otros.
- **Búsqueda avanzada**: Permite filtrar y buscar personajes o publicaciones rápidamente.
- **Temas personalizables**: Los usuarios pueden elegir diferentes temas para personalizar la interfaz.

### Estructura y Organización:

La aplicación está estructurada en varias secciones clave, cada una de ellas accesible desde un menú de navegación:

- Página de inicio: Contiene publicaciones populares y enlaces a la wiki y las guías.
- Wiki de personajes: Lista y detalles sobre todos los personajes del juego.
- Guías: Una sección donde los usuarios pueden acceder o agregar nuevas guías.
- Perfil de usuario: Los usuarios pueden gestionar su cuenta y ver sus publicaciones y comentarios.
- Error 404: Una página que se muestra cuando los usuarios acceden a una ruta no válida.

---

## Instalación y Preparación

### Requisitos Previos:

- **Node.js**: Asegúrate de tener la última versión de Node.js instalada en tu sistema. [Descargar Node.js](https://nodejs.org/).
- **Git**: Necesario para clonar el repositorio.

### Pasos para la Instalación:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/crownlesstune/Genshin_Api.git
   cd Genshin_Api

2. **Inicia el proyecto**

  ```powershell
  npm install
  npm run dev
  La letra O para abrir el proyecto en web.

Con esto tienes todo lo necesario para inicar el proyecto, npm install inicializa todas las dependencias del proyecto.


# Guía de Estilos y Prototipado

## Guía de Estilos:

La aplicación está diseñada con una interfaz sencilla y moderna, con énfasis en la legibilidad y la interacción fluida. Los colores, tipografía y elementos de diseño se eligen para reflejar el estilo visual de **Genshin Impact** y asegurar una experiencia visual coherente y atractiva.

- **Colores principales**: Azul, blanco y tonos metálicos.
- **Tipografía**: Se utiliza la fuente **Archivo Black** para los encabezados, evocando la sensación épica del juego.

## Prototipado y Wireframes:

Se crearon wireframes utilizando **Figma** para planificar la estructura y organización de la aplicación. A continuación se muestran algunos de los elementos clave:

- **Pantalla de inicio**: Contiene un menú de navegación y una lista de publicaciones populares.
- **Página de wiki de personajes**: Presenta una lista filtrable de personajes con detalles completos sobre cada uno.

---

# Desarrollo

## Secuencia de Desarrollo:

1. **Planificación**: Se definieron las funcionalidades clave, como la wiki de personajes, la red social y las guías.
2. **Implementación de la API**: Se integró la API de **Genshin Impact** para obtener los datos de personajes.
3. **Construcción de la interfaz**: Se implementaron las páginas y componentes en **React**.
4. **Autenticación de usuarios**: Se implementó **Firebase** para la autenticación y el almacenamiento de datos de usuarios.
5. **Despliegue**: La aplicación se desplegó en **GitHub Pages**.

## Dificultades Encontradas:

- **Conexión con la API de Genshin Impact**: Hubo dificultades para integrar correctamente los datos de la API y formatearlos de manera adecuada.
- **Gestión de estados en React**: El manejo de estados complejos, como el de las publicaciones y comentarios, requirió un enfoque cuidadoso para evitar redundancias y mantener el rendimiento.

## Herramientas de Control de Versiones:

Se utilizó **Git** para el control de versiones, asegurando que los cambios se registraran de manera efectiva y el código estuviera bien gestionado.

---

# Despliegue

La aplicación se despliega en **GitHub Pages** para su acceso público. El proceso de despliegue consistió en configurar el archivo `vite.config.js` con el `base` adecuado y utilizar el comando `npm run build` para generar los archivos estáticos que luego fueron subidos a **GitHub Pages**.

---

# Demo de la Aplicación

Puedes ver la aplicación en vivo en: [https://crownlesstune.github.io/Genshin_Api/](https://crownlesstune.github.io/Genshin_Api/)

---

# Conclusiones

## Comparación con la Idea Inicial:

El resultado final se ajusta a lo que puede a la idea inicial de una plataforma híbrida entre una wiki y una red social. La integración de la API de **Genshin Impact** permite acceder a datos actualizados, y las funcionalidades sociales por ahora son nulas.

## Errores y Mejoras Futuras:

- **Errores**: Algunos problemas de rendimiento al cargar grandes cantidades de datos desde la API.
- **Mejoras Futuras**:
  - Arreglar bugs.  
  - Optimización del diseño.  
  - Optimización de la carga de datos.
  - Mejoras en la experiencia de usuario con más opciones de personalización.
  - Implementación de comunid y post de usuarios.
  - Implementación de un sistema de comentarios en tiempo real.

---

# Bibliografía y Referencias

- **React**: [https://reactjs.org/](https://reactjs.org/)
- **Genshin Impact API**: [https://genshin.dev/](https://genshin.dev/)
- **Firebase**: [https://firebase.google.com/](https://firebase.google.com/)
- **Vite**: [https://vitejs.dev/](https://vitejs.dev/)
- **GitHub Pages**: [https://pages.github.com/](https://pages.github.com/)
- **ChatGPT**
- **Perplexity**
- **Tutoriales en YouTube**