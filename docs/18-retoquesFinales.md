# Retoques finales

A lo largo de los capítulos anteriores hemos construido paso a paso un juego de Buscaminas funcional. Ya tenemos la lógica principal, la navegación entre paneles, el temporizador, el sistema de puntuaciones y la gestión de distintas dificultades. El último paso consiste en **cerrar correctamente la interfaz** y **ajustar el flujo final de arranque y navegación** para que la aplicación se comporte de forma coherente y quede lista como proyecto completo.

En este capítulo vamos a hacer tres mejoras importantes:

* mejorar el aspecto visual del juego con clases y estilos más claros
* evitar que la aplicación inicie una partida “en segundo plano” al cargar el panel de inicio
* conseguir que la navegación y el arranque final se comporten como una aplicación terminada

Este capítulo no añade grandes algoritmos nuevos, pero sí aporta algo fundamental en cualquier proyecto real: **acabado, coherencia y experiencia de uso**.



## El problema del arranque actual

Hasta ahora el final de `main.js` tenía esta secuencia:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
configurarDialogoPuntuacion();
configurarBotonBorrarPuntuaciones();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```

Esto funciona, pero tiene un inconveniente.

Nada más cargar la aplicación:

* se muestra el panel de inicio
* pero también se crea una partida en segundo plano
* el temporizador empieza a correr aunque el usuario todavía no haya empezado a jugar

Desde el punto de vista técnico no rompe el programa, pero desde el punto de vista de la experiencia de usuario no es lo ideal.

Lo correcto es que:

* la aplicación arranque mostrando Inicio
* no exista ninguna partida activa todavía
* la partida solo empiece cuando el usuario elija una dificultad o pulse reinicio desde el panel de juego



## Introducir la idea de “no hay partida iniciada”

Para resolver esto, vamos a distinguir entre dos estados:

* la aplicación está abierta
* hay o no hay una partida realmente iniciada

Hasta ahora la variable `partidaActiva` indicaba si la partida seguía viva o no, pero al arrancar el programa la estábamos poniendo a `true` siempre que llamábamos a `iniciarAplicacion()`.

La solución más sencilla es esta:

* al cargar la aplicación, mostramos Inicio
* actualizamos reloj y minas a valores por defecto
* no arrancamos `iniciarAplicacion()` automáticamente
* solo llamamos a `iniciarAplicacion()` cuando el usuario empieza una partida



## Preparar la interfaz inicial

Vamos a crear una función que deje preparada la interfaz al arrancar.

Añadimos en `main.js`:

```javascript
function prepararInterfazInicial() {

  partidaActiva = false;
  detenerTemporizador();
  reiniciarReloj();
  actualizarContadorMinas();
  actualizarTituloPartida();

}
```

Esta función deja la aplicación en un estado limpio:

* no hay partida activa
* el temporizador está parado
* el reloj está a cero
* el contador de minas muestra el valor de la dificultad actual
* el título del panel de partida está preparado

De esta manera la interfaz ya queda consistente desde el principio, aunque todavía no se haya generado un tablero nuevo.



## Iniciar partida solo cuando corresponda

Ahora debemos cambiar la lógica del menú.

Hasta ahora, cuando el usuario pulsaba un botón con `data-difficulty`, ocurría esto:

* se actualizaba `dificultadActual`
* se llamaba a `iniciarAplicacion()`

Eso ya está bien. Lo que debemos hacer es **eliminar la llamada automática a `iniciarAplicacion()` al final del archivo**.

Así, la primera partida no comenzará hasta que el usuario elija Fácil, Normal o Difícil.



## Ajustar el botón de reinicio

Hay un caso especial: el botón de reinicio (`#carita`).

Si el usuario pulsa la carita mientras está en el panel de partida, debe comenzar una nueva partida con la dificultad actual.

Pero si está en otro panel, el comportamiento más lógico es:

* mostrar el panel de partida
* iniciar una nueva partida

Vamos a mejorar la función `configurarBotonReinicio()` para que haga justamente eso.

Sustituimos su contenido por este:

```javascript
function configurarBotonReinicio() {

  const botonReinicio = document.querySelector("#carita");

  if (botonReinicio) {
    botonReinicio.addEventListener("click", () => {
      mostrarPanel("panel_partida");
      iniciarAplicacion();
    });
  }

}
```

Con esto conseguimos que la carita siempre tenga sentido como “empezar una partida”.



## Mejorar el abandono de partida

La función `abandonarPartida()` ya detenía el reloj y marcaba la partida como no activa.

Vamos a dejarla así, de forma definitiva:

```javascript
function abandonarPartida() {

  partidaActiva = false;
  detenerTemporizador();
  reiniciarReloj();

}
```

Esto es suficiente para el tutorial porque:

* la partida deja de estar activa
* el tiempo se resetea
* el siguiente inicio generará un tablero nuevo

No necesitamos complicarlo más para este proyecto.



## Ajustar la navegación para que no rompa el flujo

La función `mostrarPanel(idPanel)` ya detectaba cuándo salíamos del panel de partida.

La mantendremos con esta lógica:

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

    if (idPanel === "panel_puntuaciones") {
      actualizarPanelPuntuaciones();
    }
  }

}
```

Con esto conseguimos que:

* salir de la partida la detenga correctamente
* entrar en puntuaciones refresque la tabla
* el resto de paneles funcionen igual de bien



## Mejorar la experiencia visual de las celdas

Hasta ahora la lógica del juego ya funciona, pero para que la interfaz quede bien terminada conviene asociar mejor los estados visuales a clases CSS.

Las celdas pueden estar en varios estados:

* cerrada
* abierta
* con bandera

Y además pueden contener:

* una mina
* un número
* una celda vacía

Ya estábamos usando clases como `abierta` y `bandera`, así que ahora conviene apoyarnos más en ellas visualmente desde el CSS.



## Añadir estilos mínimos recomendados

En `css/estilos.css`, asegúrate de tener reglas equivalentes a estas:

```css
body {
  font-family: Arial, sans-serif;
}

.hidden {
  display: none;
}

.board {
  display: grid;
  gap: 2px;
  justify-content: start;
  margin-top: 1rem;
}

.celda {
  width: 32px;
  height: 32px;
  border: 1px solid #999;
  background-color: #cfcfcf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.celda.abierta {
  background-color: #f1f1f1;
  border-color: #bbb;
  cursor: default;
}

.celda.bandera {
  background-color: #ffe7a8;
}

.hud {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.counter-box {
  background: #222;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-align: center;
}

.face-button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
```

Estos estilos no son complejos, pero mejoran mucho el aspecto del juego y permiten que la interfaz tenga un acabado más claro y agradable.



## Ajustar dinámicamente el tamaño del tablero

Cuando cambiamos de dificultad, el número de celdas cambia. Para que el tablero se vea bien, conviene ajustar automáticamente el número de columnas del grid.

Podemos hacerlo dentro de `crearTablero` en `board.js`.

Añade esta línea justo después de seleccionar el contenedor:

```javascript
tablero.style.gridTemplateColumns = `repeat(${columnas}, 32px)`;
```

La función quedará así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda, alHacerClickDerechoCelda) {

  const tablero = document.querySelector("#tablero");

  tablero.innerHTML = "";
  tablero.style.gridTemplateColumns = `repeat(${columnas}, 32px)`;

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

Con esto el tablero se adapta visualmente a cada dificultad.



## Refinar el flujo de arranque definitivo

Ahora ya podemos dejar el final de `main.js` como debe quedar en la versión terminada del tutorial.

En lugar de esto:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
configurarDialogoPuntuacion();
configurarBotonBorrarPuntuaciones();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```

lo dejaremos así:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
configurarDialogoPuntuacion();
configurarBotonBorrarPuntuaciones();
prepararInterfazInicial();
mostrarPanel("panel_inicio");
```

Ahora el flujo es correcto:

* se registran todos los eventos
* se prepara la interfaz
* se muestra el panel de inicio
* todavía no hay partida en marcha
* la partida empieza cuando el usuario elige una dificultad o pulsa la carita



## Código final de `main.js`

La versión final de `main.js`, tras este último ajuste del tutorial, debería quedar así:

```javascript
import {
  crearTablero,
  crearMatriz,
  colocarMinas,
  calcularNumeros
} from "./board.js";

import {
  guardarPuntuacion,
  borrarPuntuaciones,
  generarTablaPuntuaciones
} from "./scores.js";

let matrizJuego = [];
let partidaActiva = false;
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
    mostrarDialogoPuntuacion();
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

function calcularPuntos() {

  const configuracion = dificultades[dificultadActual];
  const totalCeldas = configuracion.filas * configuracion.columnas;

  if (tiempo === 0) {
    return 0;
  }

  return Math.floor((configuracion.minas * 1000) / tiempo + totalCeldas);

}

function mostrarDialogoPuntuacion() {

  const dialogo = document.querySelector("#dialogoPuntuacion");
  const inputNombre = document.querySelector("#nombreJugador");

  if (!dialogo) {
    return;
  }

  if (inputNombre) {
    inputNombre.value = "";
  }

  dialogo.showModal();

}

function actualizarPanelPuntuaciones() {

  const contenedor = document.querySelector("#tablaPuntuaciones");

  if (contenedor) {
    contenedor.innerHTML = generarTablaPuntuaciones();
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

    if (idPanel === "panel_puntuaciones") {
      actualizarPanelPuntuaciones();
    }
  }

}

function configurarBotonReinicio() {

  const botonReinicio = document.querySelector("#carita");

  if (botonReinicio) {
    botonReinicio.addEventListener("click", () => {
      mostrarPanel("panel_partida");
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

function configurarDialogoPuntuacion() {

  const formulario = document.querySelector("#formPuntuacion");
  const dialogo = document.querySelector("#dialogoPuntuacion");
  const inputNombre = document.querySelector("#nombreJugador");
  const botonCancelar = document.querySelector("#cancelarGuardar");

  if (botonCancelar && dialogo) {
    botonCancelar.addEventListener("click", () => {
      dialogo.close();
    });
  }

  if (formulario && dialogo && inputNombre) {
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const nombre = inputNombre.value.trim() || "Anónimo";

      const puntuacion = {
        nombre,
        puntos: calcularPuntos(),
        dificultad: dificultadActual,
        tiempo
      };

      guardarPuntuacion(puntuacion);
      actualizarPanelPuntuaciones();

      dialogo.close();
      mostrarPanel("panel_puntuaciones");
    });
  }

}

function configurarBotonBorrarPuntuaciones() {

  const boton = document.querySelector("#borrarPuntuaciones");

  if (boton) {
    boton.addEventListener("click", () => {
      borrarPuntuaciones();
      actualizarPanelPuntuaciones();
    });
  }

}

function prepararInterfazInicial() {

  partidaActiva = false;
  detenerTemporizador();
  reiniciarReloj();
  actualizarContadorMinas();
  actualizarTituloPartida();

}

configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
configurarDialogoPuntuacion();
configurarBotonBorrarPuntuaciones();
prepararInterfazInicial();
mostrarPanel("panel_inicio");
```



## Código final ajustado de `board.js`

El archivo `board.js` puede quedar así:

```javascript
export function crearTablero(filas, columnas, alHacerClickCelda, alHacerClickDerechoCelda) {

  const tablero = document.querySelector("#tablero");

  tablero.innerHTML = "";
  tablero.style.gridTemplateColumns = `repeat(${columnas}, 32px)`;

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



## Qué hemos conseguido al finalizar el tutorial

Con este último capítulo hemos cerrado el proyecto de forma coherente.

Ahora la aplicación:

* arranca mostrando el panel de inicio
* no inicia partidas automáticamente en segundo plano
* comienza una partida solo cuando el usuario lo decide
* navega correctamente entre paneles
* detiene la partida al salir del panel de juego
* muestra un tablero adaptado visualmente a cada dificultad
* mantiene una interfaz mucho más limpia y lógica

Con esto damos por terminado el tutorial guiado del Buscaminas. El alumnado ha recorrido un proceso completo en el que ha aprendido:

* JavaScript moderno en el navegador
* manipulación del DOM
* eventos
* matrices y algoritmos
* temporizadores
* almacenamiento en `localStorage`
* modularización del código
* navegación entre paneles
* desarrollo completo de una pequeña aplicación web interactiva

El resultado es ya un proyecto final plenamente funcional y suficientemente cercano a una aplicación real como para servir de solución modelo y de base para futuras ampliaciones.
