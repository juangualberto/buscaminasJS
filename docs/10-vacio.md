# Destapando el vacío

En el capítulo anterior hemos conseguido que el jugador pueda abrir celdas y ver su contenido. Si la celda contiene un número, se muestra en pantalla. Si contiene una mina, aparece el símbolo correspondiente. Si su valor es `0`, la celda se abre pero queda vacía.

Sin embargo, en un Buscaminas real ocurre algo más: cuando el jugador abre una celda vacía, no se descubre solo esa posición, sino también las celdas vecinas que forman parte de la misma zona vacía.

Ese será el objetivo de este capítulo.

Vamos a implementar el comportamiento clásico del juego:

* si una celda tiene un número, solo se abre esa celda
* si una celda es vacía (`0`), se abrirán también sus vecinas
* el proceso continuará mientras sigan apareciendo celdas vacías conectadas

Este mecanismo hará que el tablero se comporte ya de una forma mucho más parecida al Buscaminas real.



## Qué significa expandir una zona vacía

Una celda vacía es una celda cuyo valor en la matriz es `0`. Eso significa que no hay minas en ninguna de las posiciones que la rodean.

Cuando el jugador abre una celda así, el juego puede abrir con seguridad todas sus vecinas. Algunas de esas vecinas también serán vacías, por lo que el proceso debe continuar.

Imaginemos una zona amplia del tablero donde no hay minas cerca. En lugar de obligar al usuario a pulsar celda por celda, el juego abre automáticamente toda esa región.

Ese proceso se conoce como **expansión de celdas vacías**.



## El problema de la repetición

Si queremos abrir automáticamente las vecinas de una celda vacía, no basta con abrir solo las ocho posiciones que la rodean. También debemos abrir las vecinas de aquellas que sean vacías, y así sucesivamente.

Esto significa que necesitamos una función que pueda llamarse a sí misma varias veces.

En programación, este patrón se llama **recursividad**.



## Idea general de la solución

La lógica será la siguiente:

1. abrir la celda actual
2. si tiene un número, detenerse
3. si tiene valor `0`, recorrer sus vecinas
4. abrir cada vecina válida
5. si alguna vecina también es `0`, repetir el proceso

Para que funcione bien, debemos evitar abrir dos veces la misma celda. Si no lo hacemos, el programa entraría en un bucle sin fin.

Afortunadamente ya tenemos una forma sencilla de comprobarlo: si la celda ya tiene la clase `abierta`, no volvemos a procesarla.



## Crear una función para abrir vecinas

Vamos a seguir trabajando en `main.js`.

Hasta ahora teníamos una función `abrirCelda(fila, columna)` que abría una única posición. Vamos a ampliarla para que, cuando el valor sea `0`, abra también las celdas vecinas.

Partimos de esta estructura:

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

Ahora añadiremos la lógica de expansión.



## Recorrer las ocho vecinas

Si la celda tiene valor `0`, necesitaremos recorrer las posiciones que la rodean.

Podemos hacerlo con dos bucles muy parecidos a los que usamos para contar minas vecinas.

Añadimos este bloque al final de `abrirCelda`:

```javascript
if (valor === 0) {

  for (let f = fila - 1; f <= fila + 1; f++) {
    for (let c = columna - 1; c <= columna + 1; c++) {

      if (f === fila && c === columna) {
        continue;
      }

      if (
        f >= 0 &&
        f < matrizJuego.length &&
        c >= 0 &&
        c < matrizJuego[0].length
      ) {
        abrirCelda(f, c);
      }

    }
  }

}
```

Este código hace lo siguiente:

* recorre las posiciones vecinas
* ignora la celda central
* comprueba que cada posición está dentro de la matriz
* llama de nuevo a `abrirCelda` para cada vecina válida

Ahí está la recursividad.



## Por qué esta función no entra en bucle infinito

Puede parecer que llamar a `abrirCelda` desde dentro de `abrirCelda` es peligroso, pero en este caso funciona porque al principio de la función comprobamos esto:

```javascript
if (celda.classList.contains("abierta")) {
  return;
}
```

En cuanto una celda ya ha sido abierta, el programa no vuelve a procesarla.

Gracias a esa condición, cada celda se abre una sola vez.



## Código completo de abrirCelda con expansión

La función `abrirCelda` queda ahora así:

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
    return;
  }

  if (valor > 0) {
    celda.textContent = valor;
    return;
  }

  celda.textContent = "";

  for (let f = fila - 1; f <= fila + 1; f++) {
    for (let c = columna - 1; c <= columna + 1; c++) {

      if (f === fila && c === columna) {
        continue;
      }

      if (
        f >= 0 &&
        f < matrizJuego.length &&
        c >= 0 &&
        c < matrizJuego[0].length
      ) {
        abrirCelda(f, c);
      }

    }
  }

}
```

Observa que ahora usamos varios `return` para separar claramente los casos:

* si es mina, termina
* si es número, termina
* solo si es `0` continúa con la expansión

Esta forma de escribir el código mejora mucho su claridad.



## Qué ocurre ahora cuando el jugador pulsa una celda vacía

Con esta nueva versión, cuando el jugador pulsa una celda cuyo valor es `0`, el programa:

1. abre la celda actual
2. recorre sus vecinas
3. abre cada vecina
4. si alguna vecina también es `0`, repite el proceso
5. se detiene en las celdas numéricas que rodean la zona vacía

Este comportamiento es exactamente el que esperamos en el Buscaminas.



## Resultado práctico

A partir de este capítulo, el juego ya no abrirá solo una celda aislada.

Ahora, si el jugador pulsa una zona vacía:

* se abrirá una región entera del tablero
* aparecerán automáticamente los números de los bordes
* la experiencia de juego será mucho más natural

Este cambio hace que el proyecto dé un salto importante en jugabilidad.



## Código completo actualizado de main.js

Después de este capítulo, `main.js` debería quedar así:

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
    return;
  }

  if (valor > 0) {
    celda.textContent = valor;
    return;
  }

  celda.textContent = "";

  for (let f = fila - 1; f <= fila + 1; f++) {
    for (let c = columna - 1; c <= columna + 1; c++) {

      if (f === fila && c === columna) {
        continue;
      }

      if (
        f >= 0 &&
        f < matrizJuego.length &&
        c >= 0 &&
        c < matrizJuego[0].length
      ) {
        abrirCelda(f, c);
      }

    }
  }

}

function obtenerCeldaDOM(fila, columna) {

  return document.querySelector(
    `.celda[data-fila="${fila}"][data-columna="${columna}"]`
  );

}

iniciarAplicacion();
```



## Qué hemos conseguido en este capítulo

En este capítulo hemos implementado una de las mecánicas más importantes del Buscaminas:

* la apertura automática de zonas vacías
* la expansión recursiva de celdas
* la detención correcta en celdas numéricas
* la prevención de aperturas repetidas

Con esto, el juego ya empieza a comportarse de una forma mucho más real.

En el siguiente capítulo vamos a añadir la otra gran mecánica del Buscaminas: **colocar y quitar banderas con el clic derecho del ratón**.

\pagebreak

