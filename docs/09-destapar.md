# Abrir celdas y mostrar el contenido

En los capítulos anteriores hemos construido la base lógica del Buscaminas. Ya somos capaces de crear una matriz interna, colocar minas y calcular cuántas minas rodean a cada celda.

Sin embargo, todavía falta lo más importante desde el punto de vista del jugador: **que al pulsar una celda ocurra algo visible en pantalla**.

En este capítulo vamos a conectar la lógica interna del juego con la parte visual del tablero. A partir de ahora, cuando el usuario haga clic en una celda, el programa consultará la matriz y mostrará en pantalla lo que hay en esa posición.

Esto nos permitirá:

* abrir celdas
* mostrar números
* mostrar minas
* empezar a dar comportamiento real al tablero



## Qué debe ocurrir al pulsar una celda

Cuando el jugador hace clic en una celda, pueden ocurrir tres situaciones:

* la celda contiene una mina
* la celda contiene un número
* la celda está vacía

En este capítulo vamos a implementar las dos primeras:

* si hay una mina, mostraremos un símbolo de mina
* si hay un número, mostraremos ese número
* si el valor es `0`, de momento mostraremos una celda vacía abierta

Más adelante mejoraremos el comportamiento de las celdas vacías para que se abran automáticamente sus vecinas.



## Necesitamos acceder a la matriz desde el tablero

Hasta ahora el archivo `board.js` genera las celdas visuales y detecta clics, pero la matriz real del juego está en `main.js`.

Por tanto, cuando se pulse una celda, `board.js` debe poder avisar a `main.js` de qué posición se ha pulsado.

Una forma sencilla de hacerlo es permitir que `crearTablero` reciba una función como parámetro. Esa función se ejecutará cada vez que el usuario haga clic sobre una celda.

Esto nos permitirá mantener una separación clara:

* `board.js` se ocupa del tablero visual
* `main.js` se ocupa de la lógica de la partida



## Modificar crearTablero para recibir una función

Vamos a actualizar la función `crearTablero` en `board.js`.

Antes la teníamos así:

```javascript
export function crearTablero(filas, columnas) {
```

Ahora la cambiaremos a esta versión:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda) {
```

Y dentro del evento de clic, en lugar de llamar a `manejarClickCelda`, llamaremos a la función recibida como parámetro.

El código quedará así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda) {

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

        alHacerClickCelda(f, c);

      });

      tablero.appendChild(celda);

    }

  }

}
```

Con este cambio, el tablero sigue creando las celdas, pero ahora la lógica del clic se decidirá desde `main.js`.



## Crear una función para abrir una celda

Ahora vamos a `main.js`, donde sí tenemos acceso a la matriz interna.

Vamos a declarar una función que abra una celda.

```javascript
function abrirCelda(fila, columna) {

  const valor = matrizJuego[fila][columna];

  console.log("Abrir celda:", fila, columna, "valor:", valor);

}
```

Esta función busca el valor almacenado en la matriz para la posición pulsada.

De momento solo lo mostramos en consola para comprobar que el flujo funciona.



## Llamar a abrirCelda desde crearTablero

Actualizamos la llamada a `crearTablero` en `main.js`.

Antes teníamos:

```javascript
crearTablero(8, 8);
```

Ahora usaremos:

```javascript
crearTablero(8, 8, abrirCelda);
```

De este modo, cuando el usuario haga clic sobre una celda, el tablero llamará a la función `abrirCelda`.



## Localizar visualmente la celda pulsada

Además de consultar la matriz, necesitamos modificar la celda correspondiente en el DOM.

Como cada celda tiene guardadas sus coordenadas en `dataset`, podemos localizarla con un selector.

Añadimos en `main.js` esta función auxiliar:

```javascript
function obtenerCeldaDOM(fila, columna) {

  return document.querySelector(
    `.celda[data-fila="${fila}"][data-columna="${columna}"]`
  );

}
```

Esta función devuelve el elemento HTML correspondiente a una posición del tablero.



## Mostrar el contenido de la celda

Ahora ya podemos completar la función `abrirCelda`.

```javascript
function abrirCelda(fila, columna) {

  const valor = matrizJuego[fila][columna];
  const celda = obtenerCeldaDOM(fila, columna);

  if (!celda) {
    return;
  }

  celda.classList.add("abierta");

  if (valor === -1) {
    celda.textContent = "💣";
  } else if (valor > 0) {
    celda.textContent = valor;
  } else {
    celda.textContent = "";
  }

}
```

Veamos qué hace este código:

* obtiene el valor de la matriz
* localiza la celda en el DOM
* le añade una clase para indicar que está abierta
* muestra una mina, un número o deja la celda vacía



## Evitar abrir dos veces la misma celda

Si un jugador pulsa varias veces sobre la misma celda, no queremos que el programa vuelva a procesarla continuamente.

Por eso conviene comprobar si ya está abierta.

Podemos hacerlo mirando si ya tiene la clase `abierta`.

```javascript
function abrirCelda(fila, columna) {

  const valor = matrizJuego[fila][columna];
  const celda = obtenerCeldaDOM(fila, columna);

  if (!celda) {
    return;
  }

  if (celda.classList.contains("abierta")) {
    return;
  }

  celda.classList.add("abierta");

  if (valor === -1) {
    celda.textContent = "💣";
  } else if (valor > 0) {
    celda.textContent = valor;
  } else {
    celda.textContent = "";
  }

}
```

Con esta condición evitamos abrir varias veces la misma celda.



## Actualizar iniciarAplicacion

Ahora la función principal de `main.js` debe quedar así:

```javascript
import {
  crearTablero,
  crearMatriz,
  colocarMinas,
  calcularNumeros
} from "./board.js";

let matrizJuego = [];

function iniciarAplicacion() {

  matrizJuego = crearMatriz(8, 8);

  colocarMinas(matrizJuego, 10);

  calcularNumeros(matrizJuego);

  crearTablero(8, 8, abrirCelda);

}

function abrirCelda(fila, columna) {

  const valor = matrizJuego[fila][columna];
  const celda = obtenerCeldaDOM(fila, columna);

  if (!celda) {
    return;
  }

  if (celda.classList.contains("abierta")) {
    return;
  }

  celda.classList.add("abierta");

  if (valor === -1) {
    celda.textContent = "💣";
  } else if (valor > 0) {
    celda.textContent = valor;
  } else {
    celda.textContent = "";
  }

}

function obtenerCeldaDOM(fila, columna) {

  return document.querySelector(
    `.celda[data-fila="${fila}"][data-columna="${columna}"]`
  );

}

iniciarAplicacion();
```



## Qué conseguimos ahora

A partir de este momento el juego ya tiene un comportamiento visible real.

Cuando el jugador haga clic en una celda:

* el programa consultará la matriz
* abrirá la celda correspondiente
* mostrará una mina si la hay
* mostrará un número si la celda tiene minas alrededor
* dejará la celda vacía si su valor es `0`

Todavía faltan muchas mejoras, pero ya tenemos el primer funcionamiento auténtico del Buscaminas.



## Código completo actualizado de board.js

Después de este capítulo, `board.js` quedará así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda) {

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

        alHacerClickCelda(f, c);

      });

      tablero.appendChild(celda);

    }

  }

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

export function contarMinasVecinas(matriz, fila, columna) {

  let total = 0;

  for (let f = fila - 1; f <= fila + 1; f++) {
    for (let c = columna - 1; c <= columna + 1; c++) {

      if (f === fila && c === columna) {
        continue;
      }

      if (
        f >= 0 &&
        f < matriz.length &&
        c >= 0 &&
        c < matriz[0].length
      ) {
        if (matriz[f][c] === -1) {
          total++;
        }
      }

    }
  }

  return total;

}

export function calcularNumeros(matriz) {

  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {

      if (matriz[fila][columna] !== -1) {
        matriz[fila][columna] = contarMinasVecinas(matriz, fila, columna);
      }

    }
  }

}
```



## Qué hemos conseguido en este capítulo

En este capítulo hemos dado un paso muy importante: hemos unido la lógica interna del juego con la interfaz visual.

Ahora el proyecto ya es capaz de:

* detectar qué celda pulsa el jugador
* consultar el valor de esa posición en la matriz
* abrir visualmente la celda
* mostrar minas y números en pantalla

El juego ya empieza a parecerse a un Buscaminas real.

En el siguiente capítulo mejoraremos el comportamiento de las celdas vacías, haciendo que cuando el jugador abra una celda con valor `0` se descubran automáticamente las celdas vecinas.
