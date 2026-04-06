# Tutorial de JavaScript: Construcción de un Buscaminas

¡Bienvenido a este recurso de aprendizaje! Este repositorio contiene un manual completo diseñado para que aprendas **JavaScript** de una manera práctica y estructurada.

### ¿Qué es este proyecto?

El objetivo de este manual es enseñarte cómo JavaScript permite añadir **lógica y comportamiento** a una página web. A diferencia de los documentos estáticos, utilizaremos este lenguaje para que el navegador reaccione a las acciones del usuario, permitiéndonos crear una aplicación completa desde cero.

A lo largo de las sesiones, aprenderás conceptos fundamentales como la manipulación del **DOM (Document Object Model)**, la gestión de eventos y la lógica de programación necesaria para desarrollar un **juego de Buscaminas** funcional en el navegador.

### Requisitos previos

Para seguir este manual correctamente, es **necesario tener conocimientos previos de HTML y CSS**. 

*   **HTML:** Se encarga de definir la estructura de nuestra página (las "paredes" de nuestra aplicación).
*   **CSS:** Se encarga del diseño y la apariencia visual (la "decoración").
*   **JavaScript:** Será nuestra herramienta para añadir la "electricidad" y los mecanismos que harán que el juego funcione.

### Índice del Manual

Todos los temas están organizados de forma secuencial en la carpeta `docs`. Haz clic en los enlaces para acceder a cada capítulo:

1.  [**Introducción a JavaScript**](./docs/01-Intro.md): Conceptos básicos, el motor de ejecución y el DOM.
2.  [**Estructura del Proyecto**](./docs/02-addjs.md): Cómo organizar los archivos y trabajar con módulos de JavaScript.
3.  [**Sintaxis Básica**](./docs/03-sintaxis.md): Variables (`let`, `const`), tipos de datos, funciones y estructuras de control.
4.  [**Interacción con el DOM**](./docs/04-dom.md): Selección de elementos, modificación de contenido y gestión de eventos.
5.  [**Generación del Tablero**](./docs/05-tablero.md): Creación dinámica de elementos HTML mediante bucles y matrices.
6.  [**Gestión de Clics**](./docs/06-clic.md): Detección de interacción en las celdas y uso de atributos `dataset`.
7.  [**Lógica de Matrices y Minas**](./docs/07-matrices.md): Creación del tablero lógico y colocación aleatoria de minas.
8.  [**Cálculo de Números**](./docs/08-numeros.md): Algoritmos para contar minas vecinas en la matriz.
9.  [**Apertura de Celdas**](./docs/09-destapar.md): Conexión entre la lógica interna y la interfaz visual.
10. [**Expansión Recursiva**](./docs/10-vacio.md): Implementación del destapado automático de zonas vacías.
11. [**Banderas y Eventos de Ratón**](./docs/11-eventos.md): Uso del clic derecho para marcar sospechas de minas.
12. [**Lógica de Final de Partida**](./docs/12-gameover.md): Detección de victoria y derrota.
13. [**Temporizador y Reinicio**](./docs/13-contador.md): Control del tiempo de juego y gestión del botón de reset.
14. [**Niveles de Dificultad**](./docs/14-dificultad.md): Configuración de diferentes tamaños de tablero y número de minas.
15. [**Navegación entre Paneles**](./docs/15-navegacion.md): Creación de una aplicación multipanel (Inicio, Juego, Ayuda).
16. [**Navegación Avanzada**](./docs/16-navegacionAvanzada.md): Gestión del estado del juego al cambiar de sección.
17. [**Puntuaciones con LocalStorage**](./docs/17-localstorage.md): Persistencia de datos en el navegador para guardar récords.


### Aviso a navegantes

¡Atención, futuros maestros del DOM! 

Antes de que te lances a programar tu **Buscaminas**, tengo que darte un aviso importante: estos apuntes son como la "electricidad" de nuestra casa web. Si no los usas pronto, podrías quedarte a oscuras. 

***AVISO DE OBSOLESCENCIA PROGRAMADA***

¡Hola, aspirante a programador! Estás ante un manual de **JavaScript moderno**, cargado de módulos, funciones flecha y manipulación del DOM. Pero recuerda: en el mundo del desarrollo web, lo "moderno" de hoy es el "retro" de mañana.

JavaScript fue creado en **1995** y, desde entonces, no ha parado de mutar. Con la llegada de **ECMAScript 2025**, el lenguaje sigue evolucionando más rápido que una partida de Buscaminas en nivel difícil. Por eso, estos apuntes tienen una **fecha de caducidad estimada de 3 años**. 

¿Por qué 3 años?
*   **A los 2 años:** Algunas funciones que hoy nos parecen "lo último" empezarán a parecerse a las paredes viejas de nuestra estructura HTML.
*   **A los 3 años:** Si intentas leer este manual en el 2028 sin haberlo tocado antes, ¡podría darte un error de sintaxis en el cerebro! Es probable que para entonces ya estemos usando telepatía para manejar el `localStorage`.
*   **Más de 3 años:** Corres el riesgo de que tu código parezca escrito por **Brendan Eich** en una tarde de café en 1995.

¡Estudia ahora! No dejes que tus conocimientos caduquen. Si esperas demasiado, cuando intentes ejecutar tu lógica de juego, te sentirás como si acabaras de **pisar una mina en la primera casilla**. 

¡Aprovecha que el **motor de JavaScript** de tu navegador todavía entiende este manual y manos a la obra!
