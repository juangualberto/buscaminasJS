# Pensamiento computacional: calculando los números para las celdas

## Calcular los números de cada celda

En el capítulo anterior hemos creado la matriz interna del tablero y hemos colocado las minas aleatoriamente. Ahora el programa ya sabe dónde están las minas, pero todavía falta una parte esencial del Buscaminas: **calcular los números que aparecen en las celdas**.

En este juego, cada celda que no contiene una mina muestra un número. Ese número indica cuántas minas hay en las posiciones vecinas.

Por ejemplo, si una celda tiene el valor `2`, significa que en las ocho posiciones que la rodean hay exactamente dos minas.

En este capítulo vamos a aprender a:

* recorrer la matriz del tablero
* inspeccionar las celdas vecinas
* contar minas alrededor de una posición
* guardar ese número dentro de la matriz

Cuando terminemos, la matriz interna del juego ya contendrá toda la información necesaria para que el tablero funcione correctamente.



## Qué significa “celdas vecinas”

Cada celda del tablero puede tener hasta ocho vecinas:

* arriba
* abajo
* izquierda
* derecha
* arriba izquierda
* arriba derecha
* abajo izquierda
* abajo derecha

Si imaginamos una celda en el centro, sus vecinas serían estas posiciones:

```id="vecinos_esquema"
fila-1, columna-1   fila-1, columna   fila-1, columna+1
fila,   columna-1   fila,   columna   fila,   columna+1
fila+1, columna-1   fila+1, columna   fila+1, columna+1
```

La celda central no cuenta. Solo nos interesan las que están alrededor.



## Qué debemos calcular

Vamos a recorrer todas las posiciones de la matriz.

Para cada celda:

* si contiene una mina, no hacemos nada
* si no contiene una mina, contamos cuántas minas hay alrededor
* guardamos ese número en la propia matriz

Por ejemplo, si una posición está vacía pero tiene tres minas alrededor, esa celda pasará a contener el valor `3`.

De esta forma la matriz quedará completamente preparada.



## Crear una función para contar minas vecinas

Abrimos el archivo `board.js` y añadimos una nueva función.

```javascript
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
```

Esta función recibe:

* la matriz del tablero
* la fila de la celda actual
* la columna de la celda actual

Y devuelve el número de minas que hay alrededor.



## Cómo funciona esta función

La variable `total` almacenará el número de minas encontradas.

```javascript
let total = 0;
```

Después usamos dos bucles para recorrer las posiciones vecinas:

```javascript
for (let f = fila - 1; f <= fila + 1; f++) {
  for (let c = columna - 1; c <= columna + 1; c++) {
```

Esto recorre las tres filas y las tres columnas que rodean a la celda actual.

Pero una de esas posiciones es la propia celda central. No debemos contarla, así que la saltamos:

```javascript
if (f === fila && c === columna) {
  continue;
}
```



## Comprobar los límites de la matriz

No todas las celdas tienen ocho vecinas.

Por ejemplo, una celda en una esquina solo tiene tres posiciones alrededor. Por eso debemos comprobar que las coordenadas vecinas sean válidas.

```javascript
if (
  f >= 0 &&
  f < matriz.length &&
  c >= 0 &&
  c < matriz[0].length
)
```

Con esta condición evitamos acceder a posiciones que no existen.



## Contar minas

Una vez comprobado que la posición vecina es válida, miramos si contiene una mina.

```javascript
if (matriz[f][c] === -1) {
  total++;
}
```

Si hay una mina, incrementamos el contador.

Al final devolvemos el total.



## Calcular todos los números del tablero

Ahora necesitamos una función que recorra toda la matriz y aplique este cálculo a cada celda que no sea una mina.

Añadimos en `board.js` la siguiente función:

```javascript
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

Esta función recorre todas las posiciones del tablero.

Si encuentra una celda que no contiene una mina, calcula cuántas minas hay alrededor y sustituye el valor `0` por el número correspondiente.



## Probar el cálculo desde main.js

Ahora vamos a utilizar esta nueva función en `main.js`.

Actualizamos la importación:

```javascript
import {
  crearTablero,
  crearMatriz,
  colocarMinas,
  calcularNumeros
} from "./board.js";
```

Y modificamos la función principal:

```javascript
let matrizJuego = [];

function iniciarAplicacion() {

  crearTablero(8, 8);

  matrizJuego = crearMatriz(8, 8);

  colocarMinas(matrizJuego, 10);

  calcularNumeros(matrizJuego);

  console.log(matrizJuego);

}

iniciarAplicacion();
```

Ahora la consola ya no mostrará solo ceros y minas. También veremos números en aquellas posiciones que tengan minas alrededor.



## Qué aspecto tendrá la matriz ahora

Después de ejecutar `calcularNumeros`, la matriz podría quedar con un aspecto parecido a este:

```javascript
[
  [0, 1, -1, 2, 1],
  [0, 1, 2, -1, 1],
  [0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [-1, 1, 0, 0, 0]
]
```

En este ejemplo:

* `-1` representa una mina
* `0` representa una celda vacía sin minas alrededor
* `1`, `2`, etc. indican el número de minas cercanas

Esta es exactamente la información que necesita el juego para funcionar.



## Por qué todavía no se muestran los números en pantalla

Aunque la matriz ya contiene los números correctos, de momento el jugador no los ve. Eso es porque el tablero visible sigue siendo solo una cuadrícula de celdas cerradas.

La matriz es la parte lógica del juego.

Más adelante, cuando el usuario haga clic en una celda, el programa consultará la matriz para saber:

* si hay una mina
* si debe mostrar un número
* si la celda está vacía y hay que abrir más posiciones

Por tanto, este cálculo es un paso interno pero absolutamente necesario.



## Código completo actualizado de board.js

Después de este capítulo, el archivo `board.js` debería quedar así:

```javascript
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

En este capítulo hemos completado la preparación lógica del tablero.

Ahora el proyecto ya es capaz de:

* colocar minas aleatoriamente
* recorrer las celdas del tablero
* calcular cuántas minas rodean a cada posición
* guardar esa información dentro de la matriz

Con esto ya tenemos el tablero lógico casi terminado.

En el siguiente capítulo empezaremos a conectar esta lógica con la parte visual del juego, haciendo que al pulsar una celda se abra y muestre su contenido.

\pagebreak
