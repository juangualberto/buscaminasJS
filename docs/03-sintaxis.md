# Sintaxis básica de JavaScript

En los capítulos anteriores hemos preparado la estructura del proyecto y hemos conseguido ejecutar nuestro primer archivo JavaScript desde el navegador. A partir de ahora comenzaremos a aprender los elementos básicos del lenguaje que necesitaremos para programar el juego del Buscaminas.

No vamos a estudiar todo JavaScript en profundidad, sino **las herramientas necesarias para construir nuestro proyecto**. A medida que avancemos iremos utilizando estas herramientas en el desarrollo del juego.

En este capítulo veremos:

* cómo declarar variables
* los tipos de datos más comunes
* arrays y objetos
* estructuras de control
* funciones

Todos estos elementos forman la base de cualquier programa JavaScript.

## Variables

Una variable es un espacio en memoria donde podemos guardar información.

En JavaScript moderno utilizamos principalmente dos palabras clave para declarar variables:

* `let`
* `const`

### Usando `let`

La palabra clave `let` se utiliza cuando el valor de la variable puede cambiar.

```javascript
let minas = 10;
let tiempo = 0;
```

En este ejemplo:

* `minas` guarda el número de minas de la partida
* `tiempo` guarda los segundos que han pasado desde que empezó el juego

Posteriormente podemos modificar su valor:

```javascript
tiempo = tiempo + 1;
```

### Usando `const`

La palabra clave `const` se utiliza cuando el valor no va a cambiar.

```javascript
const nombreJuego = "Buscaminas";
```

Una vez definida, esta variable no puede modificarse.

En general, es buena práctica utilizar `const` siempre que sea posible y reservar `let` únicamente para valores que deban cambiar.

## Tipos de datos básicos

JavaScript permite trabajar con diferentes tipos de datos.

Los más utilizados en nuestro proyecto serán:

| Tipo     | Ejemplo         |
| -------- | --------------- |
| Número   | `10`, `3.14`    |
| Texto    | `"Hola"`        |
| Booleano | `true`, `false` |
| Array    | `[1,2,3]`       |
| Objeto   | `{x:1, y:2}`    |

### Números

```javascript
let filas = 8;
let columnas = 8;
let minas = 10;
```

Estos valores nos servirán más adelante para definir el tamaño del tablero.

### Texto (strings)

Los textos se escriben entre comillas.

```javascript
let mensaje = "Juego iniciado";
```

Podemos mostrarlos en la consola:

```javascript
console.log(mensaje);
```

### Booleanos

Un booleano solo puede tener dos valores:

* `true`
* `false`

```javascript
let partidaTerminada = false;
```

Este tipo de variable es muy útil para controlar el estado del juego.

## Arrays

Un **array** es una lista de valores.

Se utilizan mucho cuando necesitamos trabajar con colecciones de datos.

Por ejemplo:

```javascript
let numeros = [1,2,3,4,5];
```

Podemos acceder a cada elemento utilizando su posición.

```javascript
console.log(numeros[0]);
```

La numeración siempre empieza en **0**.

Los arrays serán muy importantes en nuestro proyecto, ya que el tablero del buscaminas se representará mediante una **matriz**, que no es más que un array de arrays.

## Objetos

Un objeto permite agrupar información relacionada.

Por ejemplo:

```javascript
const jugador = {
  nombre: "Ana",
  puntuacion: 1200
};
```

Podemos acceder a sus propiedades así:

```javascript
console.log(jugador.nombre);
```

Los objetos son muy útiles cuando necesitamos almacenar información estructurada.

## Condicionales

Los condicionales permiten ejecutar código solo cuando se cumple una condición.

La estructura más utilizada es `if`.

```javascript
let minas = 10;

if (minas > 0) {
  console.log("Todavía quedan minas");
}
```

También podemos añadir una alternativa con `else`.

```javascript
if (minas > 0) {
  console.log("La partida continúa");
} else {
  console.log("No quedan minas");
}
```

Los condicionales serán fundamentales para comprobar situaciones como:

* si el jugador ha pisado una mina
* si ha ganado la partida
* si puede colocar una bandera

## Bucles

Los bucles permiten repetir una operación varias veces.

Uno de los más utilizados es el bucle `for`.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Este bucle imprimirá en la consola:

```
0
1
2
3
4
```

Los bucles serán esenciales cuando tengamos que:

* recorrer las filas del tablero
* recorrer las columnas
* comprobar las celdas vecinas

## Funciones

Una función es un bloque de código que realiza una tarea concreta.

Podemos definir una función así:

```javascript
function saludar() {
  console.log("Hola");
}
```

Para ejecutarla simplemente la llamamos:

```javascript
saludar();
```

Las funciones también pueden recibir parámetros.

```javascript
function sumar(a, b) {
  return a + b;
}
```

Y utilizarse de esta forma:

```javascript
let resultado = sumar(2,3);
console.log(resultado);
```

Las funciones serán muy importantes en nuestro proyecto, porque nos permitirán dividir el programa en pequeñas tareas, por ejemplo:

* crear el tablero
* colocar minas
* abrir una celda
* comprobar si el jugador ha ganado

## Funciones flecha (arrow functions)

JavaScript moderno permite escribir funciones de forma más compacta utilizando **arrow functions**.

Por ejemplo:

```javascript
const mostrarMensaje = () => {
  console.log("Hola desde una función flecha");
};
```

Estas funciones se utilizan mucho cuando trabajamos con eventos del navegador.

## Probar código desde main.js

Podemos probar algunos de estos conceptos modificando temporalmente nuestro archivo `main.js`.

Por ejemplo:

```javascript
function iniciarAplicacion() {

  const filas = 8;
  const columnas = 8;

  console.log("Tablero:", filas, "x", columnas);

}

iniciarAplicacion();
```

Si abrimos la consola del navegador veremos:

```
Tablero: 8 x 8
```

Esto confirma que nuestro código JavaScript se está ejecutando correctamente.

## Qué hemos aprendido en este capítulo

En este capítulo hemos visto los elementos básicos del lenguaje JavaScript:

* variables
* tipos de datos
* arrays
* objetos
* condicionales
* bucles
* funciones

Estos conceptos serán suficientes para comenzar a programar la lógica del juego.

En el siguiente capítulo empezaremos a trabajar con el **DOM**, que nos permitirá interactuar con los elementos HTML y comenzar a construir el tablero del Buscaminas dinámicamente desde JavaScript.

\pagebreak
