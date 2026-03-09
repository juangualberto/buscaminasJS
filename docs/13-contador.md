# Timers

En el capítulo anterior hemos conseguido que el juego ya tenga una lógica completa de victoria y derrota. El jugador puede abrir celdas, colocar banderas, perder si pisa una mina y ganar si descubre todas las celdas seguras.

Ahora vamos a incorporar dos elementos muy importantes para que el Buscaminas se parezca mucho más al proyecto final:

* un **temporizador**
* un **botón para reiniciar la partida**

El temporizador permitirá medir cuánto tiempo tarda el jugador en completar la partida. El botón de reinicio permitirá comenzar una nueva partida sin necesidad de recargar manualmente la página.

Estas dos mejoras son muy habituales en juegos de navegador y nos ayudarán a entender dos conceptos muy importantes en JavaScript:

* la ejecución periódica de código con `setInterval` (**el timer**)
* la gestión de eventos en elementos de la interfaz



## El panel superior del juego

En nuestro `index.html` ya existen varios elementos que forman parte del panel de control del juego.

Entre ellos están:

* el contador de minas
* el botón central con la carita
* el contador de tiempo

En este capítulo vamos a empezar a usar dos de esos elementos:

* `#reloj`
* `#carita`

El reloj mostrará los segundos que lleva la partida. La carita actuará como botón para reiniciar.



## Qué es un temporizador en JavaScript

JavaScript permite ejecutar código repetidamente cada cierto tiempo mediante la función:

```javascript
setInterval()
```

Su funcionamiento general es este:

```javascript
const temporizador = setInterval(() => {
  console.log("Ha pasado un segundo");
}, 1000);
```

El valor `1000` indica mil milisegundos, es decir, un segundo.

El problema es que, una vez iniciado, el temporizador seguirá ejecutándose hasta que lo detengamos. Para detenerlo utilizamos:

```javascript
clearInterval(temporizador);
```

En nuestro juego necesitaremos:

* iniciar el reloj al comenzar una partida
* detenerlo cuando la partida termine
* reiniciarlo cuando el jugador empiece otra partida



## Variables para controlar el tiempo

Vamos a declarar en `main.js` dos nuevas variables de módulo:

```javascript
let tiempo = 0;
let temporizador = null;
```

Estas variables tendrán el siguiente papel:

* `tiempo` almacenará los segundos transcurridos
* `temporizador` guardará el identificador del `setInterval`

De esta forma podremos detener el intervalo cuando queramos.

Ahora la parte superior de `main.js` quedará así:

```javascript
let matrizJuego = [];
let partidaActiva = true;
let tiempo = 0;
let temporizador = null;
```



## Mostrar el tiempo en pantalla

Necesitamos una función que actualice el contador visual del reloj.

Añadimos en `main.js` esta función:

```javascript
function actualizarReloj() {

  const reloj = document.querySelector("#reloj");

  if (reloj) {
    reloj.textContent = tiempo;
  }

}
```

Esta función busca el elemento del DOM con id `reloj` y escribe en él el valor actual de la variable `tiempo`.



## Iniciar el temporizador

Ahora vamos a crear una función para arrancar el reloj.

```javascript
function iniciarTemporizador() {

  detenerTemporizador();

  temporizador = setInterval(() => {
    tiempo++;
    actualizarReloj();
  }, 1000);

}
```

Esta función hace varias cosas:

* primero detiene cualquier temporizador anterior
* crea un nuevo `setInterval`
* cada segundo incrementa la variable `tiempo`
* actualiza el valor visual del reloj

La llamada a `detenerTemporizador()` al principio es importante para evitar que se creen varios intervalos al mismo tiempo.



## Detener el temporizador

Añadimos ahora la función complementaria:

```javascript
function detenerTemporizador() {

  if (temporizador !== null) {
    clearInterval(temporizador);
    temporizador = null;
  }

}
```

Con esto podremos parar el reloj cuando el jugador gane, pierda o salga de la partida.



## Reiniciar el reloj

También necesitamos una función para volver a poner el tiempo a cero.

```javascript
function reiniciarReloj() {
  tiempo = 0;
  actualizarReloj();
}
```

Esta función se utilizará cada vez que comience una nueva partida.



## Poner en marcha el temporizador al iniciar la partida

Ahora debemos modificar la función `iniciarAplicacion()` para que:

* ponga el tiempo a cero
* actualice el reloj
* arranque el temporizador

La función quedará así:

```javascript
function iniciarAplicacion() {

  partidaActiva = true;

  reiniciarReloj();
  iniciarTemporizador();

  matrizJuego = crearMatriz(8, 8);

  colocarMinas(matrizJuego, 10);

  calcularNumeros(matrizJuego);

  crearTablero(8, 8, abrirCelda, alternarBandera);

}
```

De este modo, cada nueva partida empezará con el reloj en `0` y el contador comenzará a avanzar automáticamente.



## Detener el reloj al perder

Si el jugador pisa una mina, la partida termina. Por tanto, también debe detenerse el temporizador.

Buscamos este bloque dentro de `abrirCelda`:

```javascript
if (valor === -1) {
  celda.textContent = "💣";
  partidaActiva = false;
  mostrarTodasLasMinas();
  return;
}
```

Y lo sustituimos por este:

```javascript
if (valor === -1) {
  celda.textContent = "💣";
  partidaActiva = false;
  detenerTemporizador();
  mostrarTodasLasMinas();
  return;
}
```

Así, cuando el jugador pierde, el reloj se congela.



## Detener el reloj al ganar

También debemos detener el temporizador si el jugador gana la partida.

Buscamos este bloque al final de `abrirCelda`:

```javascript
if (comprobarVictoria()) {
  partidaActiva = false;
  console.log("¡Has ganado!");
}
```

Y lo sustituimos por este:

```javascript
if (comprobarVictoria()) {
  partidaActiva = false;
  detenerTemporizador();
  console.log("¡Has ganado!");
}
```

De esta forma, el tiempo final de la partida queda fijado en el momento exacto en que se completa el tablero.



## Añadir el botón de reinicio

Ahora vamos a usar el botón con id `carita`.

Este botón debe servir para comenzar una nueva partida cuando el usuario haga clic sobre él.

Vamos a crear una función para registrar este evento.

Añadimos en `main.js`:

```javascript
function configurarBotonReinicio() {

  const botonReinicio = document.querySelector("#carita");

  if (botonReinicio) {
    botonReinicio.addEventListener("click", () => {
      iniciarAplicacion();
    });
  }

}
```

Esta función busca el botón y le asocia un evento `click` que vuelve a iniciar el juego.



## Cuándo debemos llamar a configurarBotonReinicio

Esta función debe ejecutarse una sola vez cuando la aplicación arranca por primera vez.

Por tanto, al final del archivo, en lugar de llamar directamente a `iniciarAplicacion()`, haremos lo siguiente:

```javascript
configurarBotonReinicio();
iniciarAplicacion();
```

Así conseguimos que:

* se configure el botón
* se inicie la primera partida al cargar la página



## Evitar múltiples listeners en el botón

Es importante que `configurarBotonReinicio()` se llame una sola vez. Si la llamáramos dentro de `iniciarAplicacion()`, cada reinicio añadiría un nuevo listener al mismo botón.

Eso provocaría un comportamiento incorrecto.

Por eso es mejor dejar la configuración de eventos generales fuera del flujo de reinicio.



## Resultado práctico

A partir de este capítulo, el juego ya se comportará así:

* al comenzar una partida, el reloj empieza en `0`
* cada segundo aumenta en una unidad
* si el jugador pierde, el reloj se detiene
* si el jugador gana, el reloj se detiene
* si el jugador pulsa la carita, comienza una nueva partida
* al reiniciar, el reloj vuelve a cero y vuelve a arrancar

Esto hace que la experiencia de uso sea mucho más cercana a la del juego real.



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
let tiempo = 0;
let temporizador = null;

function iniciarAplicacion() {

  partidaActiva = true;

  reiniciarReloj();
  iniciarTemporizador();

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
    detenerTemporizador();
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
    detenerTemporizador();
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

function actualizarReloj() {

  const reloj = document.querySelector("#reloj");

  if (reloj) {
    reloj.textContent = tiempo;
  }

}

function iniciarTemporizador() {

  detenerTemporizador();

  temporizador = setInterval(() => {
    tiempo++;
    actualizarReloj();
  }, 1000);

}

function detenerTemporizador() {

  if (temporizador !== null) {
    clearInterval(temporizador);
    temporizador = null;
  }

}

function reiniciarReloj() {
  tiempo = 0;
  actualizarReloj();
}

function configurarBotonReinicio() {

  const botonReinicio = document.querySelector("#carita");

  if (botonReinicio) {
    botonReinicio.addEventListener("click", () => {
      iniciarAplicacion();
    });
  }

}

configurarBotonReinicio();
iniciarAplicacion();
```



## Qué hemos conseguido en este capítulo

En este capítulo hemos añadido dos piezas fundamentales de la interfaz del juego:

* un temporizador funcional
* un botón de reinicio de la partida

Ahora el proyecto ya es capaz de:

* contar los segundos que dura una partida
* mostrar ese tiempo en pantalla
* detener el reloj al ganar o perder
* reiniciar el tablero con un clic sobre la carita
* comenzar una nueva partida sin recargar la página

Con esto el Buscaminas ya se parece mucho más al proyecto final.

En el siguiente capítulo incorporaremos **el contador de minas y la selección de dificultad**, para que la aplicación permita cambiar entre distintos tamaños de tablero y distintas cantidades de minas.
