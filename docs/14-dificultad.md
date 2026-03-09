# Añadir el contador de minas y la selección de dificultad

En el capítulo anterior hemos incorporado el temporizador y el reinicio de partida. El juego ya tiene una estructura bastante completa, pero todavía faltan dos elementos fundamentales para acercarnos al proyecto final:

* el **contador de minas**
* la **selección de dificultad desde el menú**

El contador de minas permitirá mostrar al jugador cuántas minas hay en la partida. La selección de dificultad permitirá cambiar entre distintos tamaños de tablero y distintas cantidades de minas, haciendo que el juego sea más variado y más parecido a una aplicación real.

En este capítulo vamos a preparar la lógica necesaria para manejar diferentes configuraciones de partida y actualizar la interfaz en función de la dificultad elegida.



## Qué dificultades tendrá el juego

Nuestro Buscaminas tendrá tres niveles de dificultad:

* fácil
* media
* difícil

Cada nivel tendrá una configuración distinta de:

* número de filas
* número de columnas
* número de minas

Por ejemplo, podemos empezar con esta propuesta:

```javascript
easy   → 8 filas, 8 columnas, 10 minas
medium → 12 filas, 12 columnas, 25 minas
hard   → 16 filas, 16 columnas, 40 minas
```

Más adelante podrías ajustar estos valores, pero de momento son adecuados para construir el juego.


## Crear un objeto de configuración

Vamos a declarar en `main.js` un objeto que almacene las distintas dificultades.

Añadimos este bloque al principio del archivo, después de las variables globales:

```javascript
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
```

Este objeto nos permitirá acceder fácilmente a la configuración de cada modo de juego.

Por ejemplo:

```javascript
dificultades.easy.minas
```

devolvería `10`.


## Guardar la dificultad actual

Ahora necesitamos una variable que indique qué dificultad está activa en cada momento.

Añadimos en `main.js`:

```javascript
let dificultadActual = "easy";
```

Esto significa que, cuando se cargue la aplicación, la partida comenzará por defecto en modo fácil.


## Modificar iniciarAplicacion para usar la dificultad elegida

Hasta ahora `iniciarAplicacion()` creaba siempre una partida de 8x8 con 10 minas.

Vamos a cambiarlo para que tome los datos desde el objeto `dificultades`.

La función quedará así:

```javascript
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
```

Ahora el tamaño del tablero y el número de minas dependen de la dificultad seleccionada.



## Mostrar el número de minas en pantalla

En el HTML ya existe un elemento con id `minas` que actuará como contador visual.

Necesitamos una función que actualice su contenido.

Añadimos en `main.js`:

```javascript
function actualizarContadorMinas() {

  const contadorMinas = document.querySelector("#minas");
  const configuracion = dificultades[dificultadActual];

  if (contadorMinas) {
    contadorMinas.textContent = configuracion.minas;
  }

}
```

Esta función busca el elemento del DOM y muestra el número de minas correspondiente a la dificultad actual.



## Actualizar el título de la partida

En el proyecto también existe un elemento con id `tituloPartida`.

Vamos a utilizarlo para mostrar el nombre del nivel seleccionado.

Añadimos esta función:

```javascript
function actualizarTituloPartida() {

  const titulo = document.querySelector("#tituloPartida");
  const configuracion = dificultades[dificultadActual];

  if (titulo) {
    titulo.textContent = configuracion.titulo;
  }

}
```

De esta forma, cuando el usuario cambie de dificultad, el título del panel de partida se actualizará automáticamente.



## Detectar los clics del menú de dificultad

En el `index.html` ya existen botones del menú superior con estos identificadores:

* `menu_partida_facil`
* `menu_partida_media`
* `menu_partida_dificil`

Cada uno de ellos tiene además un atributo `data-difficulty`.

Ahora debemos registrar eventos sobre esos botones para que cambien la dificultad actual e inicien una nueva partida.



## Crear una función para configurar el menú

Añadimos en `main.js` esta nueva función:

```javascript
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
```

Vamos a entender qué hace este código:

* selecciona todos los elementos que tengan `data-difficulty`
* recorre esa lista con `forEach`
* añade un `click` a cada botón
* obtiene la dificultad elegida desde `dataset`
* actualiza la variable `dificultadActual`
* inicia una nueva partida con esa configuración



## Qué significa usar dataset aquí

En el HTML, un botón puede tener algo como esto:

```html
<button data-difficulty="easy">Fácil</button>
```

Desde JavaScript podemos leer ese valor así:

```javascript
boton.dataset.difficulty
```

Esto nos evita tener que escribir una función distinta para cada botón.

Es una forma muy cómoda y moderna de conectar HTML y JavaScript.



## Configurar también el botón de inicio fácil

Como ahora la dificultad depende del menú, conviene dejar claro qué ocurre al cargar la página por primera vez.

La variable:

```javascript
let dificultadActual = "easy";
```

hará que la primera partida sea fácil.

Y más adelante, cuando el usuario pulse un botón del menú, esa dificultad cambiará.



## Cuándo llamar a configurarMenuDificultad

Esta función, igual que `configurarBotonReinicio`, debe ejecutarse una sola vez al arrancar la aplicación.

Por tanto, al final del archivo haremos:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
iniciarAplicacion();
```

De este modo:

* se configuran los eventos generales
* se inicia la primera partida
* el juego ya queda listo para reaccionar a los cambios de dificultad



## Qué ocurre ahora cuando el usuario pulsa una dificultad

A partir de este momento, si el jugador pulsa por ejemplo el botón “Difícil”, el programa hará lo siguiente:

1. leerá `data-difficulty="hard"`
2. actualizará `dificultadActual`
3. reiniciará el reloj
4. generará una nueva matriz con más filas y columnas
5. colocará el número de minas correspondiente
6. dibujará el nuevo tablero
7. actualizará el contador de minas
8. actualizará el título de la partida

Esto hace que el juego ya sea mucho más flexible y cercano a una aplicación completa.



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

configurarBotonReinicio();
configurarMenuDificultad();
iniciarAplicacion();
```

## Qué hemos conseguido en este capítulo

En este capítulo hemos añadido dos elementos muy importantes para la interfaz del juego:

* el contador visual de minas
* la selección de dificultad desde el menú

Ahora el proyecto ya es capaz de:

* iniciar partidas con distintos tamaños de tablero
* cambiar el número de minas según la dificultad
* actualizar el título de la partida
* mostrar el número de minas correspondiente
* reiniciar automáticamente el juego al cambiar de nivel

Con esto el Buscaminas se acerca mucho más a la estructura del proyecto final.

En el siguiente capítulo añadiremos la **navegación entre paneles** de la aplicación, para que los botones del menú permitan mostrar Inicio, Partida, Puntuaciones, Ayuda y Licencia.
