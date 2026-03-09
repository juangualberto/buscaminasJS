## Navegación entre paneles de la aplicación

Hasta ahora nos hemos centrado casi exclusivamente en la lógica interna del juego: creación del tablero, minas, números, banderas, temporizador, reinicio y dificultades. Sin embargo, el proyecto final no es solo una pantalla con un tablero. También incluye varios apartados accesibles desde el menú superior.

En la aplicación existen distintos paneles:

* Inicio
* Partida
* Puntuaciones
* Ayuda
* Licencia

El objetivo de este capítulo es conseguir que, al pulsar los botones del menú, se muestre el panel correspondiente y se oculten los demás.

Con esto empezaremos a transformar el juego en una aplicación web completa, con navegación interna y distintas secciones.

---

## Qué entendemos por panel

En este proyecto, un panel es una sección del HTML que representa una parte concreta de la interfaz.

Por ejemplo:

* el panel de inicio muestra una bienvenida
* el panel de partida contiene el tablero
* el panel de puntuaciones mostrará la clasificación
* el panel de ayuda explica cómo jugar
* el panel de licencia indica el uso del material

En el `index.html`, estos paneles ya existen como elementos `<section>` con un identificador propio.

Por ejemplo:

```html
<section id="panel_inicio" class="panel">
```

o

```html
<section id="panel_partida" class="panel hidden">
```

Nuestro trabajo será controlar desde JavaScript cuál de ellos está visible en cada momento.

---

## La idea general de la navegación

La navegación será muy sencilla.

Cuando el usuario pulse un botón del menú:

* se ocultarán todos los paneles
* se mostrará únicamente el panel seleccionado

Para conseguirlo utilizaremos dos elementos clave:

* una clase CSS llamada `hidden`
* una función JavaScript que muestre un panel concreto

---

## Cómo ocultar y mostrar paneles

En el HTML ya se utiliza la clase `hidden` para ocultar algunos paneles.

Por ejemplo:

```html
<section id="panel_puntuaciones" class="panel hidden">
```

Si un elemento tiene la clase `hidden`, no debe mostrarse en pantalla.

Normalmente esto se consigue en CSS con una regla como esta:

```css
.hidden {
  display: none;
}
```

Más adelante podremos revisar el CSS si fuera necesario, pero desde JavaScript lo único que haremos será añadir o quitar esa clase.

---

## Crear una función para mostrar un panel

Vamos a empezar creando en `main.js` una función llamada `mostrarPanel`.

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

Esta función hace tres cosas:

1. selecciona todos los paneles
2. añade la clase `hidden` a todos ellos
3. busca el panel cuyo id hemos indicado y le quita la clase `hidden`

Con esto conseguimos que siempre haya un único panel visible.

---

## Cómo funciona `querySelectorAll(".panel")`

La línea:

```javascript
const paneles = document.querySelectorAll(".panel");
```

selecciona todos los elementos que tengan la clase `panel`.

En nuestro proyecto, eso incluye:

* `panel_inicio`
* `panel_partida`
* `panel_puntuaciones`
* `panel_ayuda`
* `panel_licencia`

Después usamos `forEach` para recorrerlos uno por uno y ocultarlos.

---

## Mostrar el panel inicial al cargar la aplicación

Cuando la aplicación se carga por primera vez, conviene mostrar el panel de inicio.

Por tanto, al final de `iniciarAplicacion()` añadiremos una llamada a `mostrarPanel`, pero aquí hay que tener cuidado.

No queremos que cada nueva partida nos devuelva al panel de inicio, porque cuando el usuario elige una dificultad debe ver el panel de partida.

Por eso, de momento no pondremos `mostrarPanel` dentro de `iniciarAplicacion()`. En lugar de eso, controlaremos la navegación desde eventos del menú.

---

## Crear una función para configurar la navegación

Ahora vamos a registrar eventos sobre los botones del menú superior.

En el HTML ya existen botones como estos:

```html
<button id="menu_inicio" data-panel="panel_inicio">Inicio</button>
<button id="menu_puntuaciones" data-panel="panel_puntuaciones">Puntuaciones</button>
<button id="menu_ayuda" data-panel="panel_ayuda">Ayuda</button>
<button id="menu_licencia" data-panel="panel_licencia">Licencia</button>
```

Todos ellos comparten algo muy útil: tienen un atributo `data-panel`.

Eso nos permitirá crear una única función para todos.

Añadimos en `main.js`:

```javascript
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
```

Con esto, cada botón del menú mostrará el panel indicado en su atributo `data-panel`.

---

## Qué ocurre con los botones de dificultad

Hay un detalle importante: los botones de dificultad también tienen `data-panel="panel_partida"` y además tienen `data-difficulty`.

Eso significa que, cuando el usuario pulse uno de esos botones:

* la función de navegación mostrará el panel de partida
* la función de dificultad cambiará la configuración del juego e iniciará una nueva partida

Esto no es un problema. Al contrario, es justo lo que necesitamos.

Por ejemplo, si el usuario pulsa “Difícil”, deben ocurrir dos cosas:

* mostrarse el panel de partida
* iniciarse una nueva partida difícil

Y eso se consigue precisamente porque ambos comportamientos conviven.

---

## Qué pasa con el temporizador al salir del panel de partida

En el proyecto final ya trabajamos el caso en el que, si el usuario abandona la partida para ir a Inicio, Ayuda, Licencia o Puntuaciones, el temporizador debe detenerse y resetearse.

Como estamos construyendo el tutorial paso a paso, aquí vamos a introducir primero la navegación básica. En el siguiente ajuste refinaremos el comportamiento para que salir del panel de partida también pare el juego.

De momento nos centraremos en conseguir que la navegación funcione visualmente.

---

## Configurar la navegación al arrancar

Igual que hicimos con el botón de reinicio y con el menú de dificultad, esta configuración debe ejecutarse una sola vez al arrancar la aplicación.

Por tanto, al final del archivo sustituimos:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
iniciarAplicacion();
```

por:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```

Sin embargo, esta secuencia presenta un pequeño matiz.

Si mostramos primero `panel_inicio` y después el usuario no ha pulsado ninguna dificultad, el tablero puede haberse inicializado en segundo plano aunque no sea visible. Esto no rompe nada, pero no es la experiencia más limpia.

La alternativa es aceptarlo de momento, porque simplifica mucho la explicación, y más adelante ya refinaremos el flujo para que la partida empiece cuando corresponda.

Para un tutorial guiado en este punto, esta solución es suficientemente clara.

---

## Qué comportamiento tendrá ahora la aplicación

A partir de este momento:

* al cargar la aplicación, se mostrará el panel de inicio
* si el usuario pulsa Inicio, se mostrará ese panel
* si pulsa Puntuaciones, se mostrará el panel de puntuaciones
* si pulsa Ayuda, se mostrará el panel de ayuda
* si pulsa Licencia, se mostrará el panel de licencia
* si pulsa Fácil, Normal o Difícil, se mostrará el panel de partida

Es decir, la interfaz ya empezará a funcionar como una aplicación multipanel.

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

En este capítulo hemos añadido la navegación entre los distintos paneles de la aplicación.

Ahora el proyecto ya es capaz de:

* ocultar y mostrar paneles dinámicamente
* navegar entre Inicio, Partida, Puntuaciones, Ayuda y Licencia
* usar `data-panel` para conectar HTML y JavaScript
* mostrar el panel adecuado al pulsar en el menú superior

Con esto, el Buscaminas ya deja de ser solo un tablero y se convierte en una aplicación web con varias secciones.

En el siguiente capítulo refinaremos esta navegación para que, al salir de la partida, **el temporizador se detenga y el estado del juego se reinicie correctamente**, igual que ocurre en el proyecto final.
