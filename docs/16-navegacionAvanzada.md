## Detener la partida al salir del panel de juego

En el capítulo anterior hemos conseguido que la aplicación navegue entre distintos paneles: Inicio, Partida, Puntuaciones, Ayuda y Licencia. Sin embargo, todavía queda un comportamiento importante por mejorar para que el resultado se parezca al proyecto final.

Ahora mismo, si el jugador está en plena partida y pulsa en Inicio, Puntuaciones, Ayuda o Licencia, el panel cambia correctamente, pero el juego sigue vivo en segundo plano. Eso provoca dos problemas:

* el temporizador puede seguir corriendo
* la partida queda “a medias” aunque ya no estemos en el panel de juego

En una aplicación bien terminada, al salir del panel de partida debemos considerar que el usuario **abandona la partida actual**.

Por eso, en este capítulo vamos a hacer que al salir de la partida:

* se detenga el temporizador
* el reloj vuelva a cero
* la partida deje de estar activa

Con esta mejora, la navegación será mucho más coherente.

---

## Qué entendemos por “salir de la partida”

En nuestra aplicación, el panel donde se juega es:

```text
panel_partida
```

Por tanto, decimos que el usuario sale de la partida cuando:

* el panel actual es `panel_partida`
* y el nuevo panel que quiere mostrar es otro distinto

Por ejemplo:

* de `panel_partida` a `panel_inicio`
* de `panel_partida` a `panel_puntuaciones`
* de `panel_partida` a `panel_ayuda`
* de `panel_partida` a `panel_licencia`

En todos esos casos debemos cerrar correctamente la partida actual.

---

## Necesitamos recordar qué panel está activo

Para poder detectar si el usuario está saliendo del panel de partida, necesitamos saber cuál era el panel visible antes del cambio.

Hasta ahora la función `mostrarPanel(idPanel)` simplemente ocultaba todos los paneles y mostraba uno nuevo, pero no guardaba información sobre cuál era el panel anterior.

Vamos a solucionarlo declarando una nueva variable global de módulo en `main.js`:

```javascript
let panelActual = "panel_inicio";
```

Esta variable almacenará el identificador del panel visible en cada momento.

Al comenzar la aplicación asumiremos que el panel inicial es `panel_inicio`.

---

## Crear una función para abandonar la partida

Ahora vamos a agrupar en una función todas las acciones que deben hacerse cuando el usuario abandona la partida.

Añadimos en `main.js`:

```javascript
function abandonarPartida() {

  partidaActiva = false;
  detenerTemporizador();
  reiniciarReloj();

}
```

Esta función hace exactamente lo que necesitamos:

* marca la partida como no activa
* detiene el reloj
* devuelve el contador de tiempo a cero

De momento no vamos a borrar el tablero ni reiniciar la matriz, porque una nueva partida ya se generará cuando el usuario pulse una dificultad o el botón de reinicio.

---

## Modificar mostrarPanel para detectar la salida del juego

Ahora actualizaremos la función `mostrarPanel`.

Antes la teníamos así:

```javascript
function mostrarPanel(idPanel) {

  const paneles = document.querySelectorAll(".panel");

  paneles.forEach((panel) => {
    panel.classList.add("hidden");
  });

  const panelActivo = document.querySelector(`#${idPanel}`);

  if (panelActivo) {
    panelActivo.classList.remove("hidden");
  }

}
```

La vamos a sustituir por esta versión:

```javascript
function mostrarPanel(idPanel) {

  if (panelActual === "panel_partida" && idPanel !== "panel_partida") {
    abandonarPartida();
  }

  const paneles = document.querySelectorAll(".panel");

  paneles.forEach((panel) => {
    panel.classList.add("hidden");
  });

  const panelActivo = document.querySelector(`#${idPanel}`);

  if (panelActivo) {
    panelActivo.classList.remove("hidden");
    panelActual = idPanel;
  }

}
```

---

## Qué hace esta nueva versión

La parte más importante es esta:

```javascript
if (panelActual === "panel_partida" && idPanel !== "panel_partida") {
  abandonarPartida();
}
```

Esta condición significa:

* si el panel visible actualmente es el de partida
* y el nuevo panel no es el de partida
* entonces estamos saliendo del juego

En ese momento llamamos a `abandonarPartida()`.

Después, como ya hacíamos antes:

* ocultamos todos los paneles
* mostramos el panel solicitado
* actualizamos la variable `panelActual`

---

## Por qué esta solución es sencilla y didáctica

Podríamos diseñar una arquitectura más compleja con un router, clases o eventos personalizados, pero en este proyecto no merece la pena.

Para alumnos de SMR, esta solución tiene varias ventajas:

* es fácil de leer
* usa solo variables y funciones sencillas
* permite ver claramente cuándo se cambia de panel
* conecta muy bien con el funcionamiento real del programa

Es, por tanto, una solución muy adecuada para una práctica guiada.

---

## Qué ocurre si el usuario cambia de dificultad

Este caso es importante.

Cuando el usuario pulsa Fácil, Normal o Difícil:

* el botón tiene `data-panel="panel_partida"`
* además tiene `data-difficulty`

Eso significa que:

* `mostrarPanel("panel_partida")` mantiene el panel de partida visible
* la condición de salida no se cumple, porque seguimos dentro de `panel_partida`
* después `configurarMenuDificultad()` llama a `iniciarAplicacion()`

Es decir, cambiar de dificultad **no se considera salir de la partida**, sino empezar una nueva partida en el mismo panel.

Y eso es exactamente lo que queremos.

---

## Qué ocurre si el usuario pulsa Inicio o Ayuda en mitad de una partida

Ahora el comportamiento será mucho más correcto:

1. el usuario está en `panel_partida`
2. pulsa un botón con `data-panel="panel_inicio"` o cualquier otro panel no partida
3. `mostrarPanel()` detecta que se abandona la partida
4. se llama a `abandonarPartida()`
5. el temporizador se detiene
6. el reloj vuelve a cero
7. se muestra el nuevo panel

Así el juego ya no sigue corriendo en segundo plano.

---

## Ajustar el arranque inicial

Como ahora estamos usando la variable `panelActual`, conviene que el flujo final del archivo sea coherente.

Al final de `main.js` seguiremos teniendo:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```

Esto hace que:

* la interfaz arranque mostrando el panel de inicio
* el juego se inicialice en segundo plano con la dificultad actual

Más adelante todavía refinaremos este comportamiento para parecerse del todo al proyecto final, pero por ahora es suficiente para mantener una lógica clara y comprensible.

---

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
let dificultadActual = "easy";
let panelActual = "panel_inicio";

const dificultades = {
  easy: {
    filas: 8,
    columnas: 8,
    minas: 10,
    titulo: "Partida fácil"
  },
  medium: {
    filas: 12,
    columnas: 12,
    minas: 25,
    titulo: "Partida normal"
  },
  hard: {
    filas: 16,
    columnas: 16,
    minas: 40,
    titulo: "Partida difícil"
  }
};

function iniciarAplicacion() {

  partidaActiva = true;

  reiniciarReloj();
  iniciarTemporizador();

  const configuracion = dificultades[dificultadActual];

  matrizJuego = crearMatriz(configuracion.filas, configuracion.columnas);

  colocarMinas(matrizJuego, configuracion.minas);

  calcularNumeros(matrizJuego);

  crearTablero(
    configuracion.filas,
    configuracion.columnas,
    abrirCelda,
    alternarBandera
  );

  actualizarContadorMinas();
  actualizarTituloPartida();

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

function actualizarContadorMinas() {

  const contadorMinas = document.querySelector("#minas");
  const configuracion = dificultades[dificultadActual];

  if (contadorMinas) {
    contadorMinas.textContent = configuracion.minas;
  }

}

function actualizarTituloPartida() {

  const titulo = document.querySelector("#tituloPartida");
  const configuracion = dificultades[dificultadActual];

  if (titulo) {
    titulo.textContent = configuracion.titulo;
  }

}

function abandonarPartida() {

  partidaActiva = false;
  detenerTemporizador();
  reiniciarReloj();

}

function mostrarPanel(idPanel) {

  if (panelActual === "panel_partida" && idPanel !== "panel_partida") {
    abandonarPartida();
  }

  const paneles = document.querySelectorAll(".panel");

  paneles.forEach((panel) => {
    panel.classList.add("hidden");
  });

  const panelActivo = document.querySelector(`#${idPanel}`);

  if (panelActivo) {
    panelActivo.classList.remove("hidden");
    panelActual = idPanel;
  }

}

function configurarBotonReinicio() {

  const botonReinicio = document.querySelector("#carita");

  if (botonReinicio) {
    botonReinicio.addEventListener("click", () => {
      iniciarAplicacion();
    });
  }

}

function configurarMenuDificultad() {

  const botones = document.querySelectorAll("[data-difficulty]");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {

      const nuevaDificultad = boton.dataset.difficulty;

      if (!nuevaDificultad) {
        return;
      }

      dificultadActual = nuevaDificultad;
      iniciarAplicacion();

    });
  });

}

function configurarNavegacion() {

  const botones = document.querySelectorAll("[data-panel]");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {

      const idPanel = boton.dataset.panel;

      if (!idPanel) {
        return;
      }

      mostrarPanel(idPanel);

    });
  });

}

configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```

---

## Qué hemos conseguido en este capítulo

En este capítulo hemos mejorado la navegación para que el estado del juego sea coherente cuando el usuario abandona la partida.

Ahora el proyecto ya es capaz de:

* detectar cuándo se sale del panel de juego
* detener el temporizador en ese momento
* reiniciar el reloj al abandonar la partida
* marcar la partida como no activa
* mantener una navegación más limpia y lógica entre paneles

Con esta mejora, la aplicación se comporta mucho mejor y se acerca todavía más al proyecto final.

En el siguiente capítulo añadiremos la **gestión de puntuaciones con localStorage**, de forma que el juego pueda guardar los resultados del usuario y mostrarlos después en el panel de puntuaciones.
