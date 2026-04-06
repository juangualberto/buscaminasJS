# LocalStorage

Hasta ahora ya tenemos un Buscaminas bastante completo: tablero, minas, números, banderas, victoria, derrota, temporizador, reinicio, dificultades y navegación entre paneles. El siguiente paso para acercarnos todavía más al proyecto final es añadir un sistema de **puntuaciones persistentes**.

En este apartado vamos a guardar y mostrar puntuaciones en almacenamiento persistente con `localStorage`.

Persistente significa que las puntuaciones no se perderán al recargar la página o cerrar el navegador. Para conseguirlo utilizaremos una herramienta del navegador llamada:

```javascript
localStorage
```

Gracias a `localStorage`, el juego podrá:

* guardar las mejores partidas
* recuperarlas más adelante
* mostrarlas en el panel de puntuaciones
* borrar la clasificación cuando el usuario lo desee

Este capítulo es importante porque introduce un concepto muy útil en aplicaciones web: **almacenar información en el navegador**.



## Qué es `localStorage`

`localStorage` es un sistema de almacenamiento que proporcionan los navegadores.

Permite guardar pares de **clave y valor** en el propio navegador del usuario.

Por ejemplo, podríamos guardar algo así:

```javascript
localStorage.setItem("usuario", "Juan");
```

Y leerlo más tarde:

```javascript
const nombre = localStorage.getItem("usuario");
```

La información permanece guardada incluso aunque cerremos la pestaña o apaguemos el navegador.

En nuestro proyecto utilizaremos `localStorage` para almacenar una lista de puntuaciones.



## Qué información guardaremos en cada puntuación

Cada puntuación del juego debe contener al menos:

* el nombre del jugador
* la puntuación obtenida
* la dificultad
* el tiempo empleado

Podemos representarlo mediante un objeto como este:

```javascript
{
  nombre: "Ana",
  puntos: 1500,
  dificultad: "easy",
  tiempo: 32
}
```

Como necesitaremos guardar varias puntuaciones, realmente almacenaremos un **array de objetos**.



## Crear el módulo `scores.js`

Hasta ahora el archivo `scores.js` existía en la estructura del proyecto pero aún no lo estábamos utilizando. Ha llegado el momento de darle contenido.

Creamos o abrimos el archivo:

```text
js/scores.js
```

En este archivo iremos colocando toda la lógica relacionada con las puntuaciones.



## Guardar y recuperar arrays con JSON

Hay un detalle importante: `localStorage` solo puede guardar **texto**.

Eso significa que, si queremos guardar un array o un objeto, primero debemos convertirlo a texto. Para ello utilizamos:

* `JSON.stringify()` para convertir a texto
* `JSON.parse()` para recuperar el objeto original

Por ejemplo:

```javascript
const datos = [{ nombre: "Ana", puntos: 100 }];
const texto = JSON.stringify(datos);

localStorage.setItem("scores", texto);
```

Y para leerlo:

```javascript
const guardado = localStorage.getItem("scores");
const puntuaciones = JSON.parse(guardado);
```

Este patrón será la base de nuestro sistema de puntuaciones.



## Crear una función para obtener las puntuaciones guardadas

Vamos a empezar escribiendo en `scores.js` una función que recupere la lista de puntuaciones del navegador.

```javascript
export function obtenerPuntuaciones() {

  const datos = localStorage.getItem("scores");

  if (!datos) {
    return [];
  }

  return JSON.parse(datos);

}
```

Esta función hace lo siguiente:

* busca la clave `scores` en `localStorage`
* si no existe, devuelve un array vacío
* si existe, convierte el texto en un array de objetos y lo devuelve

De este modo, siempre podremos trabajar con una lista de puntuaciones sin preocuparnos de si ya había datos guardados o no.



## Crear una función para guardar una nueva puntuación

Ahora añadimos una función que inserte una puntuación nueva y la vuelva a guardar.

```javascript
export function guardarPuntuacion(puntuacion) {

  const puntuaciones = obtenerPuntuaciones();

  puntuaciones.push(puntuacion);

  puntuaciones.sort((a, b) => b.puntos - a.puntos);

  localStorage.setItem("scores", JSON.stringify(puntuaciones));

}
```

Vamos a analizar qué ocurre aquí:

* primero recuperamos las puntuaciones actuales
* añadimos la nueva con `push`
* ordenamos el array de mayor a menor puntuación
* guardamos el resultado actualizado en `localStorage`

Esto hará que la clasificación quede siempre ordenada.



## Limitar el número de puntuaciones guardadas

En muchos juegos no interesa guardar una lista infinita. Lo habitual es conservar solo las mejores puntuaciones.

Podemos hacerlo fácilmente recortando el array después de ordenarlo.

Modificamos la función así:

```javascript
export function guardarPuntuacion(puntuacion) {

  const puntuaciones = obtenerPuntuaciones();

  puntuaciones.push(puntuacion);

  puntuaciones.sort((a, b) => b.puntos - a.puntos);

  const mejoresPuntuaciones = puntuaciones.slice(0, 10);

  localStorage.setItem("scores", JSON.stringify(mejoresPuntuaciones));

}
```

Con `slice(0, 10)` nos quedamos solo con las diez mejores.



## Crear una función para borrar las puntuaciones

También necesitaremos una forma de eliminar la clasificación.

Añadimos esta función a `scores.js`:

```javascript
export function borrarPuntuaciones() {
  localStorage.removeItem("scores");
}
```

Con esto el navegador elimina completamente la clave `scores`.



## Generar el HTML de la tabla de puntuaciones

Ahora debemos mostrar las puntuaciones dentro del panel correspondiente.

En el `index.html` ya existe un contenedor con id:

```text
tablaPuntuaciones
```

Vamos a crear una función en `scores.js` que genere el contenido HTML de la clasificación.

```javascript
export function generarTablaPuntuaciones() {

  const puntuaciones = obtenerPuntuaciones();

  if (puntuaciones.length === 0) {
    return "<p>No hay puntuaciones guardadas.</p>";
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          <th>Puntos</th>
          <th>Dificultad</th>
          <th>Tiempo</th>
        </tr>
      </thead>
      <tbody>
  `;

  puntuaciones.forEach((puntuacion, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${puntuacion.nombre}</td>
        <td>${puntuacion.puntos}</td>
        <td>${puntuacion.dificultad}</td>
        <td>${puntuacion.tiempo}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  return html;

}
```

Esta función devuelve un texto HTML que representa la tabla de clasificación.

Más adelante lo insertaremos en el DOM.



## Código completo de `scores.js`

Después de estos pasos, el archivo `scores.js` debería quedar así:

```javascript
export function obtenerPuntuaciones() {

  const datos = localStorage.getItem("scores");

  if (!datos) {
    return [];
  }

  return JSON.parse(datos);

}

export function guardarPuntuacion(puntuacion) {

  const puntuaciones = obtenerPuntuaciones();

  puntuaciones.push(puntuacion);

  puntuaciones.sort((a, b) => b.puntos - a.puntos);

  const mejoresPuntuaciones = puntuaciones.slice(0, 10);

  localStorage.setItem("scores", JSON.stringify(mejoresPuntuaciones));

}

export function borrarPuntuaciones() {
  localStorage.removeItem("scores");
}

export function generarTablaPuntuaciones() {

  const puntuaciones = obtenerPuntuaciones();

  if (puntuaciones.length === 0) {
    return "<p>No hay puntuaciones guardadas.</p>";
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          <th>Puntos</th>
          <th>Dificultad</th>
          <th>Tiempo</th>
        </tr>
      </thead>
      <tbody>
  `;

  puntuaciones.forEach((puntuacion, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${puntuacion.nombre}</td>
        <td>${puntuacion.puntos}</td>
        <td>${puntuacion.dificultad}</td>
        <td>${puntuacion.tiempo}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  return html;

}
```



## Importar el módulo de puntuaciones en `main.js`

Ahora tenemos que conectar este módulo con el resto de la aplicación.

Al principio de `main.js`, añadimos esta nueva importación:

```javascript
import {
  guardarPuntuacion,
  borrarPuntuaciones,
  generarTablaPuntuaciones
} from "./scores.js";
```

De esta forma `main.js` podrá:

* guardar una nueva puntuación al ganar
* borrar la clasificación cuando el usuario pulse el botón
* actualizar el panel de puntuaciones



## Crear una función para calcular los puntos

No basta con guardar el tiempo. También necesitamos calcular una puntuación numérica.

Podemos usar una fórmula sencilla que tenga en cuenta:

* el número de minas
* el tamaño del tablero
* el tiempo invertido

Añadimos esta función en `main.js`:

```javascript
function calcularPuntos() {

  const configuracion = dificultades[dificultadActual];
  const totalCeldas = configuracion.filas * configuracion.columnas;

  if (tiempo === 0) {
    return 0;
  }

  return Math.floor((configuracion.minas * 1000) / tiempo + totalCeldas);

}
```

Esta fórmula es simple, didáctica y suficiente para el tutorial.

Cuantas más minas haya y menos tiempo tarde el jugador, más puntuación obtendrá.



## Guardar la puntuación al ganar

Ahora debemos actuar cuando el jugador gana la partida.

Hasta ahora, al final de `abrirCelda`, hacíamos esto:

```javascript
if (comprobarVictoria()) {
  partidaActiva = false;
  detenerTemporizador();
  console.log("¡Has ganado!");
}
```

Vamos a reemplazarlo por una versión que además abra el cuadro para introducir el nombre del jugador.

```javascript
if (comprobarVictoria()) {
  partidaActiva = false;
  detenerTemporizador();
  mostrarDialogoPuntuacion();
}
```

De este modo, cuando se gane la partida, se abrirá el diálogo correspondiente.



## Mostrar el diálogo para guardar la puntuación

En el `index.html` ya existe un elemento `<dialog>` con id:

```text
dialogoPuntuacion
```

Vamos a crear en `main.js` una función para mostrarlo.

```javascript
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
```

Esta función:

* localiza el diálogo
* vacía el campo de nombre
* abre la ventana modal



## Guardar realmente la puntuación

Ahora necesitamos procesar el formulario del diálogo.

Vamos a crear una función que configure el botón de guardar.

Añadimos en `main.js`:

```javascript
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
```

Esta función hace bastante trabajo:

* gestiona el botón de cancelar
* intercepta el envío del formulario
* obtiene el nombre del jugador
* calcula la puntuación
* guarda la partida en `localStorage`
* actualiza la tabla visible
* cierra el diálogo
* navega al panel de puntuaciones



## Crear una función para refrescar el panel de puntuaciones

Necesitamos una forma cómoda de actualizar el contenido del panel.

Añadimos en `main.js`:

```javascript
function actualizarPanelPuntuaciones() {

  const contenedor = document.querySelector("#tablaPuntuaciones");

  if (contenedor) {
    contenedor.innerHTML = generarTablaPuntuaciones();
  }

}
```

Con esta función, cada vez que guardemos o borremos puntuaciones, la tabla se volverá a dibujar.



## Configurar el botón de borrar puntuaciones

En el HTML ya existe un botón con id:

```text
borrarPuntuaciones
```

Vamos a conectarlo con JavaScript.

Añadimos en `main.js`:

```javascript
function configurarBotonBorrarPuntuaciones() {

  const boton = document.querySelector("#borrarPuntuaciones");

  if (boton) {
    boton.addEventListener("click", () => {
      borrarPuntuaciones();
      actualizarPanelPuntuaciones();
    });
  }

}
```

Así, cuando el usuario pulse el botón, se eliminará la clasificación y se refrescará el panel.



## Actualizar las puntuaciones al navegar al panel correspondiente

Es buena idea que, cada vez que el usuario vaya al panel de puntuaciones, se reconstruya la tabla.

Podemos hacerlo dentro de `mostrarPanel`.

Buscamos esta parte:

```javascript
if (panelActivo) {
  panelActivo.classList.remove("hidden");
  panelActual = idPanel;
}
```

Y la ampliamos así:

```javascript
if (panelActivo) {
  panelActivo.classList.remove("hidden");
  panelActual = idPanel;

  if (idPanel === "panel_puntuaciones") {
    actualizarPanelPuntuaciones();
  }
}
```

Con esto, el panel de puntuaciones siempre mostrará los datos más recientes.



## Registrar las nuevas configuraciones al arrancar

Al final del archivo, además de las configuraciones anteriores, ahora debemos ejecutar también:

* `configurarDialogoPuntuacion()`
* `configurarBotonBorrarPuntuaciones()`

El final de `main.js` quedará así:

```javascript
configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
configurarDialogoPuntuacion();
configurarBotonBorrarPuntuaciones();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```



## Código completo actualizado de `main.js`

Después de este capítulo, `main.js` debería quedar así:

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

configurarBotonReinicio();
configurarMenuDificultad();
configurarNavegacion();
configurarDialogoPuntuacion();
configurarBotonBorrarPuntuaciones();
mostrarPanel("panel_inicio");
iniciarAplicacion();
```



## Qué hemos conseguido en este capítulo

En este capítulo hemos añadido una de las últimas piezas importantes del proyecto:

* almacenamiento de puntuaciones en `localStorage`
* generación de una tabla de clasificación
* apertura del diálogo al ganar
* guardado del nombre, tiempo, dificultad y puntos
* borrado de puntuaciones
* actualización automática del panel de clasificación

Con esto, el Buscaminas ya se acerca mucho al resultado final de la aplicación completa.

En el siguiente capítulo podemos centrarnos en **pulir la interfaz y ajustar el flujo final de arranque y navegación** para que el comportamiento coincida todavía mejor con el proyecto definitivo.

\pagebreak
