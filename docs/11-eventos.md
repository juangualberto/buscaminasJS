# Eventos de ratón

En los capítulos anteriores hemos conseguido que el jugador pueda abrir celdas y que las zonas vacías se expandan automáticamente. El juego ya se parece bastante a un Buscaminas real, pero todavía falta una mecánica esencial: **las banderas**.

En Buscaminas, las banderas permiten marcar las celdas donde el jugador sospecha que hay una mina. No abren la celda, simplemente la señalan.

En este capítulo vamos a implementar esta funcionalidad usando el **clic derecho del ratón**.

Al terminar, el jugador podrá:

* poner una bandera sobre una celda cerrada
* quitar una bandera si cambia de opinión
* evitar abrir accidentalmente una celda marcada

Esta mejora aporta mucha jugabilidad y nos acerca bastante más al resultado final del proyecto.



## Qué evento se produce al hacer clic derecho

Cuando el usuario pulsa el botón derecho del ratón sobre un elemento, el navegador genera un evento llamado:

```javascript
contextmenu
```

Por defecto, este evento abre el menú contextual del navegador.

Pero en nuestro juego no queremos que aparezca ese menú sobre las celdas del tablero. Queremos usar el clic derecho para marcar minas.

Por eso tendremos que hacer dos cosas:

* detectar el evento `contextmenu`
* cancelar el comportamiento por defecto del navegador

Esto se consigue con:

```javascript
event.preventDefault();
```



## Añadir el evento de clic derecho a cada celda

Vamos a modificar el archivo `board.js`.

Hasta ahora, cada celda tenía un evento `click`. Ahora añadiremos también un evento `contextmenu`.

La función `crearTablero` pasará a recibir dos funciones:

* una para el clic izquierdo
* otra para el clic derecho

La cabecera de la función quedará así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda, alHacerClickDerechoCelda) {
```

Y dentro del bucle donde creamos cada celda añadimos este nuevo evento:

```javascript
celda.addEventListener("contextmenu", (event) => {

  event.preventDefault();

  const f = Number(celda.dataset.fila);
  const c = Number(celda.dataset.columna);

  alHacerClickDerechoCelda(f, c);

});
```

Con este cambio, cada vez que el usuario haga clic derecho sobre una celda, el navegador no mostrará su menú contextual y en su lugar se ejecutará nuestra función.



## Código actualizado de crearTablero

La función completa quedará así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda, alHacerClickDerechoCelda) {

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

      celda.addEventListener("contextmenu", (event) => {

        event.preventDefault();

        const f = Number(celda.dataset.fila);
        const c = Number(celda.dataset.columna);

        alHacerClickDerechoCelda(f, c);

      });

      tablero.appendChild(celda);

    }

  }

}
```



## Crear una función para marcar banderas

Ahora pasamos a `main.js`.

Necesitamos una función que marque o desmarque una celda cuando el jugador haga clic derecho.

Vamos a crear esta función:

```javascript
function alternarBandera(fila, columna) {

  const celda = obtenerCeldaDOM(fila, columna);

  if (!celda) {
    return;
  }

  if (celda.classList.contains("abierta")) {
    return;
  }

  if (celda.classList.contains("bandera")) {
    celda.classList.remove("bandera");
    celda.textContent = "";
  } else {
    celda.classList.add("bandera");
    celda.textContent = "🚩";
  }

}
```

Esta función hace lo siguiente:

* busca la celda en el DOM
* si no existe, no hace nada
* si la celda ya está abierta, no permite poner bandera
* si ya tenía bandera, la quita
* si no tenía bandera, la pone



## Evitar abrir una celda con bandera

Ahora debemos mejorar la función `abrirCelda`.

Si una celda está marcada con bandera, el clic izquierdo no debe abrirla.

Por tanto, añadimos esta comprobación justo después de localizar la celda:

```javascript
if (celda.classList.contains("bandera")) {
  return;
}
```

La parte inicial de `abrirCelda` quedará así:

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

  if (celda.classList.contains("bandera")) {
    return;
  }
```

Con esto, las banderas realmente protegen a la celda frente a una apertura accidental.



## Actualizar la llamada a crearTablero

Como ahora `crearTablero` recibe dos funciones, debemos actualizar la llamada en `main.js`.

Antes teníamos:

```javascript
crearTablero(8, 8, abrirCelda);
```

Ahora debe quedar así:

```javascript
crearTablero(8, 8, abrirCelda, alternarBandera);
```

De esta forma:

* el clic izquierdo llamará a `abrirCelda`
* el clic derecho llamará a `alternarBandera`



## Comportamiento esperado

A partir de ahora, el tablero responderá de esta manera:

* **clic izquierdo**: abre la celda
* **clic derecho**: pone o quita una bandera
* **clic izquierdo sobre una bandera**: no hace nada
* **clic derecho sobre una celda abierta**: no hace nada

Este comportamiento coincide con el funcionamiento habitual del Buscaminas.



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

  crearTablero(8, 8, abrirCelda, alternarBandera);

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

  if (celda.classList.contains("bandera")) {
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

function alternarBandera(fila, columna) {

  const celda = obtenerCeldaDOM(fila, columna);

  if (!celda) {
    return;
  }

  if (celda.classList.contains("abierta")) {
    return;
  }

  if (celda.classList.contains("bandera")) {
    celda.classList.remove("bandera");
    celda.textContent = "";
  } else {
    celda.classList.add("bandera");
    celda.textContent = "🚩";
  }

}

function obtenerCeldaDOM(fila, columna) {

  return document.querySelector(
    `.celda[data-fila="${fila}"][data-columna="${columna}"]`
  );

}

iniciarAplicacion();
```



## Código completo actualizado de board.js

Después de este capítulo, `board.js` quedará así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda, alHacerClickDerechoCelda) {

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

      celda.addEventListener("contextmenu", (event) => {

        event.preventDefault();

        const f = Number(celda.dataset.fila);
        const c = Number(celda.dataset.columna);

        alHacerClickDerechoCelda(f, c);

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

En este capítulo hemos añadido otra de las mecánicas fundamentales del Buscaminas:

* detectar el clic derecho del ratón
* evitar el menú contextual del navegador
* poner y quitar banderas
* impedir que una celda marcada se abra por error

Con esto el juego ya ofrece una experiencia mucho más cercana a la del Buscaminas clásico.

En el siguiente capítulo implementaremos la lógica de **derrota y victoria**, de forma que el juego sepa cuándo el jugador pisa una mina y cuándo ha conseguido completar correctamente la partida.

\pagebreak
