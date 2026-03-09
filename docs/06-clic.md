## Detectar clics en las celdas del tablero

En el capítulo anterior hemos conseguido generar el tablero del juego desde JavaScript. Cada celda del tablero se crea dinámicamente y se añade al contenedor del tablero en el DOM.

El siguiente paso para avanzar en el desarrollo del Buscaminas es permitir que el jugador **interactúe con las celdas**.

Para ello necesitamos detectar cuándo el usuario hace clic sobre una celda del tablero.

En este capítulo aprenderemos a:

* detectar eventos de clic
* saber qué celda ha sido pulsada
* utilizar los atributos `dataset`
* conectar la interacción del usuario con la lógica del juego

Esto permitirá que cada celda del tablero pueda reaccionar a las acciones del jugador.

## Eventos en el navegador

Cuando el usuario interactúa con una página web, el navegador genera **eventos**.

Algunos ejemplos de eventos son:

| Evento      | Descripción                   |
| ----------- | ----------------------------- |
| `click`     | El usuario pulsa con el ratón |
| `dblclick`  | Doble clic                    |
| `keydown`   | Se pulsa una tecla            |
| `mouseover` | El ratón pasa por encima      |

JavaScript puede **escuchar estos eventos** y ejecutar código cuando ocurren.

Para ello utilizamos el método:

```javascript id="ev_listener"
addEventListener()
```

## Añadir un evento a una celda

Cada celda del tablero es un elemento HTML que hemos creado con JavaScript.

Podemos añadir un evento a cada celda justo después de crearla.

Volvemos al archivo `board.js` y añadimos el siguiente código dentro del bucle donde se crean las celdas.

```javascript id="ev_cell"
celda.addEventListener("click", () => {

  console.log("Celda pulsada");

});
```

Con este cambio, cada vez que el usuario haga clic en una celda aparecerá un mensaje en la consola.

## Saber qué celda ha sido pulsada

Para poder construir la lógica del juego necesitamos saber **qué celda concreta ha pulsado el jugador**.

En el capítulo anterior guardamos la posición de cada celda utilizando `dataset`.

```javascript id="dataset_cell"
celda.dataset.fila = fila;
celda.dataset.columna = columna;
```

Esto significa que cada celda contiene información sobre su posición dentro del tablero.

Podemos acceder a estos valores dentro del evento.

```javascript id="dataset_read"
celda.addEventListener("click", () => {

  const fila = celda.dataset.fila;
  const columna = celda.dataset.columna;

  console.log("Celda:", fila, columna);

});
```

Cuando el jugador pulse una celda veremos en la consola sus coordenadas.

## Convertir los valores a números

Los valores almacenados en `dataset` se guardan como texto.

Si queremos utilizarlos como números es recomendable convertirlos.

```javascript id="dataset_number"
const fila = Number(celda.dataset.fila);
const columna = Number(celda.dataset.columna);
```

Esto nos permitirá utilizar estos valores en cálculos posteriormente.

## Separar la lógica en una función

Para mantener el código organizado es mejor que el evento llame a una función específica.

En lugar de escribir toda la lógica dentro del `addEventListener`, podemos hacer lo siguiente:

```javascript id="event_function"
celda.addEventListener("click", () => {

  const fila = Number(celda.dataset.fila);
  const columna = Number(celda.dataset.columna);

  manejarClickCelda(fila, columna);

});
```

Ahora creamos la función `manejarClickCelda`.

```javascript id="handle_cell"
function manejarClickCelda(fila, columna) {

  console.log("Celda pulsada:", fila, columna);

}
```

Más adelante esta función se encargará de:

* abrir la celda
* comprobar si contiene una mina
* mostrar el número de minas cercanas

## Código actualizado de board.js

El archivo `board.js` ahora debería tener esta estructura:

```javascript id="board_events"
export function crearTablero(filas, columnas) {

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

        manejarClickCelda(f, c);

      });

      tablero.appendChild(celda);

    }

  }

}

function manejarClickCelda(fila, columna) {

  console.log("Celda pulsada:", fila, columna);

}
```

## Qué ocurre cuando el jugador pulsa una celda

Cuando el usuario hace clic en una celda sucede lo siguiente:

1. El navegador genera un evento `click`.
2. El evento se captura con `addEventListener`.
3. Se obtiene la posición de la celda.
4. Se llama a la función `manejarClickCelda`.
5. La función procesa la acción.

Este mecanismo será el que permitirá implementar la lógica del juego.

## Qué hemos conseguido en este capítulo

En este capítulo hemos añadido **interacción al tablero**.

Ahora el proyecto puede:

* detectar clics en cada celda
* identificar la posición de la celda pulsada
* ejecutar una función para procesar la acción

Este es un paso fundamental para que el jugador pueda interactuar con el juego.

En el siguiente capítulo comenzaremos a implementar **la lógica interna del tablero**, creando la matriz que almacenará la posición de las minas.
