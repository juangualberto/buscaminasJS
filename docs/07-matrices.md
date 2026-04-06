# Matrices

Hasta ahora hemos construido la parte visible del Buscaminas: el tablero aparece en pantalla y el usuario puede hacer clic sobre sus celdas. Sin embargo, el juego todavía no tiene una **lógica interna**. Todas las celdas son visualmente iguales y el programa aún no sabe dónde están las minas ni qué valor tiene cada posición.

Para que el juego funcione de verdad necesitamos una estructura de datos que represente internamente el tablero.

Esa estructura será una **matriz**.

La matriz no se ve en pantalla. Es una representación interna que utilizará JavaScript para almacenar la información de cada celda. Gracias a ella podremos saber:

* dónde hay minas
* qué celdas están vacías
* cuántas minas hay alrededor de una posición
* qué celda ha abierto el jugador

En este capítulo vamos a construir esa matriz y a prepararla para que más adelante podamos colocar minas y calcular los números del tablero.



## El tablero visible y el tablero interno

En un juego como Buscaminas conviene distinguir entre dos cosas:

* el **tablero visual**, que es lo que ve el usuario en el navegador
* el **tablero lógico**, que es la información interna que guarda el programa

Por ejemplo, una celda en pantalla puede parecer cerrada, pero internamente el programa ya sabe si contiene una mina o si tiene un número.

Esta separación es muy importante porque nos permite programar con más orden.

De ahora en adelante trabajaremos con estas dos capas:

* el DOM para mostrar el tablero
* una matriz de JavaScript para guardar el estado real del juego



## Qué es una matriz en JavaScript

Una matriz es un array que contiene otros arrays.

Por ejemplo:

```javascript
const matriz = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];
```

En este caso tenemos una matriz de 3 filas y 3 columnas.

Podemos acceder a cualquier posición indicando primero la fila y después la columna:

```javascript
console.log(matriz[1][1]);
```

Esto mostraría el valor de la fila 1, columna 1.

En nuestro proyecto cada posición de la matriz representará una celda del tablero.



## Crear una función para generar la matriz vacía

Vamos a comenzar creando una función que genere una matriz vacía del tamaño que queramos.

Abrimos el archivo `board.js` y añadimos la siguiente función:

```javascript
export function crearMatriz(filas, columnas) {

  const matriz = [];

  for (let fila = 0; fila < filas; fila++) {

    const filaActual = [];

    for (let columna = 0; columna < columnas; columna++) {
      filaActual.push(0);
    }

    matriz.push(filaActual);

  }

  return matriz;

}
```

Esta función crea una matriz donde todas las posiciones contienen inicialmente el valor `0`.



## Cómo funciona esta función

Vamos a entenderla paso a paso.

Primero creamos un array vacío:

```javascript
const matriz = [];
```

Después recorremos las filas con un bucle:

```javascript
for (let fila = 0; fila < filas; fila++) {
```

Dentro de cada fila creamos otro array:

```javascript
const filaActual = [];
```

A continuación recorremos las columnas y vamos insertando ceros:

```javascript
for (let columna = 0; columna < columnas; columna++) {
  filaActual.push(0);
}
```

Cuando la fila está completa la añadimos a la matriz principal:

```javascript
matriz.push(filaActual);
```

Finalmente devolvemos la matriz:

```javascript
return matriz;
```



## Probar la matriz desde main.js

Vamos a comprobar que la función funciona correctamente.

En `main.js` importamos la nueva función:

```javascript
import { crearTablero, crearMatriz } from "./board.js";
```

Y modificamos temporalmente la función principal:

```javascript
function iniciarAplicacion() {

  crearTablero(8, 8);

  const matriz = crearMatriz(8, 8);

  console.log(matriz);

}

iniciarAplicacion();
```

Si abrimos la consola del navegador veremos una matriz de 8 filas por 8 columnas rellena de ceros.

Esto significa que ya hemos creado la estructura interna del tablero.



## Qué significará cada valor de la matriz

De momento todas las posiciones contienen `0`, pero más adelante utilizaremos distintos valores para representar el contenido de cada celda.

Por ejemplo:

* `0` → celda vacía
* `-1` → mina
* `1`, `2`, `3`... → número de minas cercanas

Todavía no vamos a calcular los números, pero sí vamos a preparar la matriz para poder colocar minas.



## Colocar minas aleatoriamente

El siguiente paso es insertar minas dentro de la matriz.

Para ello necesitamos una función que elija posiciones aleatorias y marque esas posiciones con el valor `-1`.

Añadimos a `board.js` la siguiente función:

```javascript
export function colocarMinas(matriz, cantidadMinas) {

  let minasColocadas = 0;

  while (minasColocadas < cantidadMinas) {

    const fila = Math.floor(Math.random() * matriz.length);
    const columna = Math.floor(Math.random() * matriz[0].length);

    if (matriz[fila][columna] !== -1) {
      matriz[fila][columna] = -1;
      minasColocadas++;
    }

  }

}
```

Esta función modifica la matriz original y coloca las minas directamente en ella.



## Cómo funciona `Math.random()`

Para generar posiciones aleatorias usamos esta expresión:

```javascript
Math.floor(Math.random() * matriz.length)
```

`Math.random()` devuelve un número aleatorio entre 0 y 1.

Si lo multiplicamos por el número de filas obtenemos un valor comprendido entre 0 y el tamaño de la matriz.

Después usamos `Math.floor()` para quedarnos con la parte entera.

De esta forma obtenemos un índice válido para elegir una fila o una columna al azar.



## Evitar que dos minas caigan en la misma celda

No basta con elegir posiciones aleatorias. También debemos evitar que dos minas se coloquen en la misma celda.

Por eso comprobamos:

```javascript
if (matriz[fila][columna] !== -1)
```

Si en esa posición todavía no hay una mina, la colocamos:

```javascript
matriz[fila][columna] = -1;
```

Y aumentamos el contador:

```javascript
minasColocadas++;
```

Si ya había una mina, simplemente repetimos el intento.



## Probar la colocación de minas

Ahora actualizamos `main.js` para probar esta nueva función.

```javascript
import { crearTablero, crearMatriz, colocarMinas } from "./board.js";

function iniciarAplicacion() {

  crearTablero(8, 8);

  const matriz = crearMatriz(8, 8);

  colocarMinas(matriz, 10);

  console.log(matriz);

}

iniciarAplicacion();
```

En la consola veremos la matriz con varios valores `-1` repartidos de forma aleatoria.

Eso significa que ya tenemos un tablero lógico con minas colocadas.



## Guardar la matriz para usarla más adelante

Hasta ahora la matriz solo se crea dentro de `iniciarAplicacion`, pero más adelante necesitaremos acceder a ella desde otras funciones.

Por eso conviene declarar una variable global de módulo en `main.js`:

```javascript
let matrizJuego = [];
```

Y después asignarle el valor generado:

```javascript
function iniciarAplicacion() {

  crearTablero(8, 8);

  matrizJuego = crearMatriz(8, 8);

  colocarMinas(matrizJuego, 10);

  console.log(matrizJuego);

}

iniciarAplicacion();
```

De esta forma la matriz del juego queda disponible para el resto del programa.



## Código completo actualizado de board.js

Después de este capítulo, el archivo `board.js` debería quedar así:

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

      celda.addEventListener("click", () => {

        const f = Number(celda.dataset.fila);
        const c = Number(celda.dataset.columna);

        manejarClickCelda(f, c);

      });

      tablero.appendChild(celda);

    }

  }

}

function manejarClickCelda(fila, columna) {

  console.log("Celda pulsada:", fila, columna);

}

export function crearMatriz(filas, columnas) {

  const matriz = [];

  for (let fila = 0; fila < filas; fila++) {

    const filaActual = [];

    for (let columna = 0; columna < columnas; columna++) {
      filaActual.push(0);
    }

    matriz.push(filaActual);

  }

  return matriz;

}

export function colocarMinas(matriz, cantidadMinas) {

  let minasColocadas = 0;

  while (minasColocadas < cantidadMinas) {

    const fila = Math.floor(Math.random() * matriz.length);
    const columna = Math.floor(Math.random() * matriz[0].length);

    if (matriz[fila][columna] !== -1) {
      matriz[fila][columna] = -1;
      minasColocadas++;
    }

  }

}
```



## Qué hemos conseguido en este capítulo

En este capítulo hemos dado un paso fundamental en la construcción del juego.

Ahora el proyecto ya dispone de:

* una matriz interna para representar el tablero
* una función para crear esa matriz
* una función para colocar minas aleatoriamente
* una variable donde guardar el estado lógico de la partida

A partir de este momento el programa ya no solo muestra un tablero vacío, sino que también **conoce internamente dónde están las minas**.

En el siguiente capítulo calcularemos los números de cada celda, es decir, cuántas minas hay alrededor de cada posición del tablero.

\pagebreak
