# Generando el tablero 

En los capítulos anteriores hemos aprendido a trabajar con el DOM y a manipular elementos HTML desde JavaScript. Ahora vamos a utilizar estos conocimientos para crear la primera parte visible del juego: **el tablero del Buscaminas**.

El tablero es la zona donde el jugador interactúa con el juego. Está formado por una cuadrícula de celdas que el jugador irá abriendo durante la partida.

En lugar de escribir todas las celdas directamente en el HTML, vamos a **generarlas dinámicamente desde JavaScript**. Esta es la forma habitual de trabajar en aplicaciones web modernas.

## El contenedor del tablero

En el archivo `index.html` ya existe un elemento que servirá como contenedor del tablero.

```html id="board_container"
<div id="tablero" class="board"></div>
```

Este elemento está inicialmente vacío. Nuestro código JavaScript se encargará de rellenarlo con las celdas del juego.

Cada celda del tablero será un elemento HTML que crearemos desde JavaScript.

## Representar el tablero como una matriz

Internamente, el tablero del buscaminas se representa como una **matriz**.

Una matriz es simplemente un **array de arrays**.

Por ejemplo, un tablero de 3x3 podría representarse así:

```javascript
[
  [0,0,1],
  [1,2,1],
  [0,1,0]
]
```

Cada posición de la matriz representa una celda del tablero.

Más adelante almacenaremos en esta matriz información como:

* si la celda contiene una mina
* cuántas minas hay alrededor
* si la celda está abierta o cerrada

Pero por ahora solo necesitamos generar la estructura visual del tablero.

## Crear el módulo del tablero

Para mantener el código organizado vamos a crear un nuevo archivo dentro de la carpeta `js`.

Creamos el archivo:

```
js/board.js
```

Este archivo se encargará de todo lo relacionado con el tablero del juego.

## Crear una función para generar el tablero

Dentro de `board.js` vamos a escribir una función que cree el tablero.

```javascript
export function crearTablero(filas, columnas) {

  const tablero = document.querySelector("#tablero");

  tablero.innerHTML = "";

  for (let fila = 0; fila < filas; fila++) {

    for (let columna = 0; columna < columnas; columna++) {

      const celda = document.createElement("div");

      celda.classList.add("celda");

      tablero.appendChild(celda);

    }

  }

}
```

Vamos a analizar qué hace esta función.

## Seleccionar el contenedor del tablero

Primero seleccionamos el elemento donde se colocarán las celdas.

```javascript
const tablero = document.querySelector("#tablero");
```

Esto nos permite manipular el contenedor desde JavaScript.

## Limpiar el tablero

Antes de crear nuevas celdas eliminamos el contenido anterior.

```javascript
tablero.innerHTML = "";
```

Esto será útil cuando el jugador reinicie la partida.

## Crear las celdas con bucles

Utilizamos dos bucles `for` para recorrer filas y columnas.

```javascript
for (let fila = 0; fila < filas; fila++) {
  for (let columna = 0; columna < columnas; columna++) {
```

Este tipo de bucle anidado es muy común cuando trabajamos con matrices.

## Crear cada celda

Dentro del bucle creamos una celda nueva.

```javascript
const celda = document.createElement("div");
```

Después le añadimos una clase CSS.

```javascript
celda.classList.add("celda");
```

Esta clase permitirá aplicar estilos visuales.

## Añadir la celda al tablero

Finalmente añadimos la celda al contenedor.

```javascript
tablero.appendChild(celda);
```

Este proceso se repite tantas veces como celdas tenga el tablero.

## Importar la función en main.js

Ahora debemos utilizar esta función desde el archivo principal del proyecto.

Abrimos `main.js` y añadimos la importación del módulo.

```javascript
import { crearTablero } from "./board.js";
```

Después modificamos la función de inicio de la aplicación.

```javascript
function iniciarAplicacion() {

  crearTablero(8, 8);

}

iniciarAplicacion();
```

Esto generará un tablero de **8 filas por 8 columnas**.

## Qué ocurre cuando ejecutamos el código

Cuando el navegador carga la página ocurre lo siguiente:

1. Se ejecuta `main.js`.
2. `main.js` llama a la función `crearTablero`.
3. `crearTablero` crea las celdas del tablero.
4. Las celdas se añaden al contenedor HTML.

El resultado es una cuadrícula de celdas que forman el tablero del juego.

## Preparar las celdas para futuros eventos

Más adelante necesitaremos saber qué celda ha pulsado el jugador.

Para ello podemos añadir información a cada celda utilizando atributos `data`.

Modificamos ligeramente el código:

```javascript
celda.dataset.fila = fila;
celda.dataset.columna = columna;
```

Esto permite guardar la posición de cada celda.

Más adelante podremos leer estos valores para saber qué celda ha pulsado el jugador.

## Código completo del módulo board.js

El archivo `board.js` debería quedar así:

```javascript
export function crearTablero(filas, columnas) {

  const tablero = document.querySelector("#tablero");

  tablero.innerHTML = "";

  for (let fila = 0; fila < filas; fila++) {

    for (let columna = 0; columna < columnas; columna++) {

      const celda = document.createElement("div");

      celda.classList.add("celda");

      celda.dataset.fila = fila;
      celda.dataset.columna = columna;

      tablero.appendChild(celda);

    }

  }

}
```

## Qué hemos conseguido en este capítulo

En este capítulo hemos construido la primera parte real del juego:

* hemos creado el módulo del tablero
* hemos generado dinámicamente las celdas del juego
* hemos aprendido a usar bucles para crear una cuadrícula
* hemos conectado el módulo con `main.js`

Ahora el proyecto ya es capaz de **crear el tablero del Buscaminas automáticamente**.

En el siguiente capítulo empezaremos a añadir **interacción al tablero**, detectando cuándo el jugador hace clic en una celda.

\pagebreak
