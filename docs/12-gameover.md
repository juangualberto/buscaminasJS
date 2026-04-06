# Game Over

En los capítulos anteriores hemos construido gran parte del comportamiento del Buscaminas. Ya tenemos un tablero con minas, números, apertura de celdas, expansión de zonas vacías y colocación de banderas. Sin embargo, el juego todavía no sabe **cuándo termina una partida**.

En un Buscaminas real hay dos finales posibles:

* **derrota**, cuando el jugador abre una celda con una mina
* **victoria**, cuando el jugador consigue abrir todas las celdas seguras

En este capítulo vamos a añadir esa lógica. A partir de ahora el juego podrá reconocer cuándo la partida ha terminado y reaccionar en consecuencia.

Esto nos permitirá:

* impedir que el jugador siga interactuando cuando ya ha perdido o ganado
* mostrar visualmente el final de la partida
* preparar el juego para añadir más adelante temporizador, puntuaciones y reinicio

## Necesitamos saber si la partida sigue activa

Hasta ahora el programa permite seguir abriendo celdas indefinidamente. Incluso si el jugador pulsa una mina, no existe un estado formal de “partida terminada”.

Para resolverlo vamos a crear una variable que indique si la partida sigue activa.

En `main.js` añadimos esta variable junto a `matrizJuego`:

```javascript
let partidaActiva = true;
```

Esta variable tendrá dos posibles valores:

* `true` → la partida sigue en curso
* `false` → la partida ha terminado

La utilizaremos para bloquear las acciones del jugador cuando sea necesario.



## Reiniciar el estado al empezar una nueva partida

Cada vez que llamemos a `iniciarAplicacion`, debemos asegurarnos de que la partida comienza activa.

Por tanto, añadimos esta línea al principio de la función:

```javascript
partidaActiva = true;
```

La función quedará así:

```javascript
function iniciarAplicacion() {

  partidaActiva = true;

  matrizJuego = crearMatriz(8, 8);

  colocarMinas(matrizJuego, 10);

  calcularNumeros(matrizJuego);

  crearTablero(8, 8, abrirCelda, alternarBandera);

}
```

Con esto nos aseguramos de que cada nueva partida comienza correctamente.



## Bloquear acciones si la partida ha terminado

Antes de abrir una celda o poner una bandera, debemos comprobar si la partida sigue activa.

Al principio de `abrirCelda` añadimos:

```javascript
if (!partidaActiva) {
  return;
}
```

Y al principio de `alternarBandera` añadimos lo mismo:

```javascript
if (!partidaActiva) {
  return;
}
```

De esta forma, cuando la partida termine, el jugador ya no podrá seguir interactuando con el tablero.



## Detectar derrota

La derrota ocurre cuando el jugador abre una celda cuyo valor en la matriz es `-1`.

Hasta ahora, si el valor era `-1`, simplemente mostrábamos la mina.

```javascript
if (valor === -1) {
  celda.textContent = "💣";
  return;
}
```

Ahora vamos a mejorar ese comportamiento.

Cuando el jugador pisa una mina debemos:

* marcar la partida como terminada
* mostrar la mina pulsada
* revelar todas las demás minas del tablero

La primera parte queda así:

```javascript
if (valor === -1) {
  celda.textContent = "💣";
  partidaActiva = false;
  mostrarTodasLasMinas();
  return;
}
```

Con esto, en cuanto el jugador pulsa una mina, la partida termina.



## Mostrar todas las minas al perder

Ahora necesitamos crear una función que recorra toda la matriz y revele todas las minas.

Añadimos en `main.js` la siguiente función:

```javascript
function mostrarTodasLasMinas() {

  for (let fila = 0; fila < matrizJuego.length; fila++) {
    for (let columna = 0; columna < matrizJuego[fila].length; columna++) {

      if (matrizJuego[fila][columna] === -1) {

        const celda = obtenerCeldaDOM(fila, columna);

        if (celda) {
          celda.classList.add("abierta");
          celda.textContent = "💣";
        }

      }

    }
  }

}
```

Esta función recorre todas las posiciones de la matriz y, si encuentra una mina, la muestra en el tablero.

Así el jugador ve claramente dónde estaban todas las minas al perder.



## Detectar victoria

La victoria en Buscaminas no depende de poner todas las banderas, sino de haber abierto todas las celdas que **no contienen mina**.

Esto significa que debemos comprobar cuántas celdas seguras siguen cerradas.

Si no queda ninguna, el jugador ha ganado.



## Crear una función para comprobar victoria

Añadimos en `main.js` la función `comprobarVictoria`.

```javascript
function comprobarVictoria() {

  for (let fila = 0; fila < matrizJuego.length; fila++) {
    for (let columna = 0; columna < matrizJuego[fila].length; columna++) {

      if (matrizJuego[fila][columna] !== -1) {

        const celda = obtenerCeldaDOM(fila, columna);

        if (celda && !celda.classList.contains("abierta")) {
          return false;
        }

      }

    }
  }

  return true;

}
```

Esta función recorre todas las celdas del tablero.

Para cada celda que no sea una mina:

* busca su equivalente en el DOM
* comprueba si está abierta

Si encuentra хотя una celda segura cerrada, devuelve `false`.

Si termina de recorrer el tablero sin encontrar ninguna, devuelve `true`.



## Comprobar la victoria después de abrir una celda

Ahora debemos llamar a `comprobarVictoria()` cada vez que el jugador abra una celda.

La mejor posición para hacerlo es al final de `abrirCelda`, una vez que ya se ha procesado correctamente la celda.

Añadimos este bloque justo antes del final de la función:

```javascript
if (comprobarVictoria()) {
  partidaActiva = false;
  console.log("¡Has ganado!");
}
```

Sin embargo, hay un detalle importante: cuando una celda tiene valor `-1` o un número, la función hace `return` antes de llegar al final.

Para que la comprobación funcione correctamente en todos los casos, conviene reorganizar ligeramente la función.



## Reorganizar abrirCelda para comprobar la victoria

La versión actualizada de `abrirCelda` quedará así:

```javascript
function abrirCelda(fila, columna) {

  if (!partidaActiva) {
    return;
  }

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
    partidaActiva = false;
    mostrarTodasLasMinas();
    return;
  }

  if (valor > 0) {
    celda.textContent = valor;
  } else {
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

  if (comprobarVictoria()) {
    partidaActiva = false;
    console.log("¡Has ganado!");
  }

}
```

Fíjate en que ahora:

* si es mina, se termina la partida inmediatamente
* si es número, se muestra
* si es `0`, se expande
* después de procesar una celda segura, se comprueba si ya se ha ganado


## Bloquear banderas cuando la partida termina

Como ya comentamos antes, también debemos impedir que el jugador coloque banderas después de ganar o perder.

La función `alternarBandera` queda así:

```javascript
function alternarBandera(fila, columna) {

  if (!partidaActiva) {
    return;
  }

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



## Qué ocurre ahora en una partida

Con estas mejoras, el juego ya puede finalizar correctamente.

### Si el jugador pulsa una mina

* se muestra la mina pulsada
* se revelan todas las demás minas
* la partida termina
* ya no se pueden abrir más celdas ni poner banderas

### Si el jugador abre todas las celdas seguras

* el programa detecta que ya no quedan casillas sin abrir
* marca la partida como terminada
* impide seguir interactuando con el tablero

Todavía no mostramos un mensaje visual de victoria o derrota, pero la lógica ya está implementada.



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
let partidaActiva = true;

function iniciarAplicacion() {

  partidaActiva = true;

  matrizJuego = crearMatriz(8, 8);

  colocarMinas(matrizJuego, 10);

  calcularNumeros(matrizJuego);

  crearTablero(8, 8, abrirCelda, alternarBandera);

}

function abrirCelda(fila, columna) {

  if (!partidaActiva) {
    return;
  }

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
    partidaActiva = false;
    mostrarTodasLasMinas();
    return;
  }

  if (valor > 0) {
    celda.textContent = valor;
  } else {
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

  if (comprobarVictoria()) {
    partidaActiva = false;
    console.log("¡Has ganado!");
  }

}

function alternarBandera(fila, columna) {

  if (!partidaActiva) {
    return;
  }

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

function mostrarTodasLasMinas() {

  for (let fila = 0; fila < matrizJuego.length; fila++) {
    for (let columna = 0; columna < matrizJuego[fila].length; columna++) {

      if (matrizJuego[fila][columna] === -1) {

        const celda = obtenerCeldaDOM(fila, columna);

        if (celda) {
          celda.classList.add("abierta");
          celda.textContent = "💣";
        }

      }

    }
  }

}

function comprobarVictoria() {

  for (let fila = 0; fila < matrizJuego.length; fila++) {
    for (let columna = 0; columna < matrizJuego[fila].length; columna++) {

      if (matrizJuego[fila][columna] !== -1) {

        const celda = obtenerCeldaDOM(fila, columna);

        if (celda && !celda.classList.contains("abierta")) {
          return false;
        }

      }

    }
  }

  return true;

}

function obtenerCeldaDOM(fila, columna) {

  return document.querySelector(
    `.celda[data-fila="${fila}"][data-columna="${columna}"]`
  );

}

iniciarAplicacion();
```


## Qué hemos conseguido en este capítulo

En este capítulo hemos añadido la lógica que permite finalizar correctamente una partida de Buscaminas.

Ahora el proyecto ya es capaz de:

* detectar cuándo el jugador pisa una mina
* revelar todas las minas al perder
* impedir seguir jugando tras la derrota
* comprobar si todas las celdas seguras han sido abiertas
* detectar correctamente la victoria
* bloquear la interacción una vez terminada la partida

Con esto, el juego ya tiene una estructura jugable completa.

En el siguiente capítulo añadiremos dos elementos muy importantes de la interfaz: **el contador de tiempo y el reinicio de partida**, para que el juego se parezca todavía más al proyecto final.

\pagebreak
