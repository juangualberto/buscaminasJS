# Cómo incluir JavaScript correctamente 

En el capítulo anterior hemos visto qué es JavaScript y cómo puede interactuar con una página web. Ahora vamos a dar el siguiente paso: **preparar la estructura real del proyecto que utilizaremos para construir el juego del Buscaminas**.

En este capítulo vamos a crear la base del proyecto y a conectar nuestro primer archivo JavaScript con la página web.

El objetivo es que, al finalizar este apartado, tengamos un proyecto funcionando donde el navegador ya es capaz de ejecutar nuestro código JavaScript.

Este será el punto de partida sobre el que iremos construyendo el juego completo.

## Crear la estructura del proyecto

Antes de empezar a programar es importante organizar bien los archivos. Una buena estructura facilita la lectura del código y hace que el proyecto sea más fácil de mantener.

Vamos a crear una carpeta para nuestro proyecto llamada:

```
buscaminasJS
```

Dentro de esta carpeta crearemos la siguiente estructura:

```{=latex}
\begin{verbatim}
buscaminasJS
│
├─ index.html
│
├─ css/
│   └─ estilos.css
│
└─ js/
    ├─ main.js
    ├─ board.js
    └─ scores.js
\end{verbatim}
```

Cada uno de estos archivos tendrá una función concreta dentro del proyecto:

* **index.html** será la página principal de la aplicación.
* **estilos.css** contendrá el diseño de la interfaz.
* **main.js** será el punto de entrada del programa.
* **board.js** contendrá la lógica del tablero del juego.
* **scores.js** se encargará de gestionar las puntuaciones.

De momento solo vamos a trabajar con `index.html` y `main.js`. Los demás archivos los iremos utilizando más adelante.

## Conectar JavaScript con el documento HTML

Para que el navegador ejecute nuestro código JavaScript debemos incluir un script en el archivo `index.html`.

Abrimos el archivo `index.html` y dentro de la sección `<head>` añadimos la siguiente línea:

```html
<script type="module" src="js/main.js"></script>
```

El atributo `type="module"` indica al navegador que el archivo se interpretará como un **módulo de JavaScript**.

Esto tiene varias ventajas importantes:

* Permite dividir el código en varios archivos.
* Cada archivo tiene su propio ámbito de variables.
* El navegador carga el script sin bloquear la página.
* Podemos usar `import` y `export` entre archivos JavaScript.

En proyectos modernos de JavaScript esta es la forma recomendada de organizar el código.

## Crear el archivo main.js

Ahora vamos a crear el archivo principal de JavaScript.

Dentro de la carpeta `js` creamos un archivo llamado:

```
main.js
```

Este archivo será el **punto de entrada del programa**, es decir, el primer código JavaScript que se ejecutará cuando se cargue la página.

De momento añadiremos un pequeño mensaje para comprobar que todo funciona correctamente.

```javascript
console.log("Buscaminas iniciado");
```

## Comprobar que el script se ejecuta

Guardamos los archivos y abrimos `index.html` en el navegador.

Para ver el resultado debemos abrir la **consola del navegador**.

En la mayoría de navegadores se puede abrir con la tecla:

```
F12
```

Después seleccionamos la pestaña **Console**.

Si todo está configurado correctamente veremos el mensaje:

```
Buscaminas iniciado
```

Esto significa que:

* el navegador ha cargado el archivo `main.js`
* el script se ha ejecutado correctamente
* el proyecto está listo para empezar a programarse

## Crear una función de inicio de la aplicación

En proyectos reales es habitual que el programa comience dentro de una función que inicializa la aplicación.

Vamos a modificar ligeramente el contenido de `main.js`:

```javascript
function iniciarAplicacion() {
  console.log("Aplicación Buscaminas cargada correctamente");
}

iniciarAplicacion();
```

Con este pequeño cambio estamos preparando la estructura que utilizaremos más adelante.

En esta función de inicio iremos añadiendo progresivamente:

* la creación del tablero
* los eventos del juego
* la inicialización de los marcadores
* la lógica de la partida

## Qué hemos conseguido en este capítulo

En este apartado hemos preparado la base del proyecto del Buscaminas.

Ahora tenemos:

* una estructura de carpetas organizada
* un archivo HTML conectado con JavaScript
* un archivo `main.js` que actúa como punto de entrada del programa
* un proyecto que ya se ejecuta correctamente en el navegador

Aunque el programa todavía no hace nada visible en la página, ya hemos preparado la infraestructura necesaria para empezar a construir el juego.

En el siguiente capítulo comenzaremos a trabajar con **la sintaxis básica de JavaScript**, que nos permitirá empezar a escribir la lógica del juego.

\pagebreak
