# El DOM: cómo interactuar con el HTML desde JavaScript

En los capítulos anteriores hemos preparado la estructura del proyecto y hemos visto los conceptos básicos del lenguaje JavaScript. Ahora vamos a aprender cómo **JavaScript puede interactuar con los elementos de una página web**.

Cuando el navegador carga un documento HTML, lo transforma en una estructura interna que JavaScript puede manipular. Esta estructura se llama **DOM**.

DOM significa **Document Object Model**.

Gracias al DOM, JavaScript puede:

* acceder a elementos de la página
* modificar su contenido
* cambiar estilos o clases
* crear nuevos elementos
* eliminar elementos existentes

Este concepto será fundamental para construir el juego del Buscaminas, ya que el tablero del juego se generará dinámicamente desde JavaScript.

## Cómo representa el navegador una página web

Cuando el navegador lee el archivo HTML, crea una estructura en forma de árbol.

Por ejemplo, si tenemos el siguiente código HTML:

```html
<body>
  <h1>Buscaminas</h1>
  <button id="boton">Jugar</button>
</body>
```

El navegador lo representa internamente así:

```text
Document
└── body
   ├── h1
   └── button
```

Cada uno de estos elementos se convierte en un **objeto JavaScript** que podemos manipular desde nuestro código.

## Seleccionar elementos del DOM

Para poder trabajar con un elemento primero debemos **seleccionarlo**.

JavaScript proporciona varios métodos para hacerlo.

El más utilizado en JavaScript moderno es:

```
document.querySelector()
```

Este método permite buscar un elemento utilizando selectores similares a los de CSS.

Por ejemplo, si queremos seleccionar el botón con id `carita` de nuestro proyecto, podemos escribir:

```javascript
const boton = document.querySelector("#carita");
```

El símbolo `#` indica que estamos buscando un **id**.

### Seleccionar por clase

Si queremos seleccionar un elemento por su clase:

```javascript
const panel = document.querySelector(".panel");
```

El símbolo `.` indica una **clase**.

### Seleccionar varios elementos

Si queremos seleccionar varios elementos podemos usar:

```
document.querySelectorAll()
```

Por ejemplo:

```javascript
const botones = document.querySelectorAll("button");
```

Esto devuelve una lista de todos los botones de la página.

## Leer y modificar contenido

Una vez que tenemos un elemento del DOM podemos acceder a su contenido.

Por ejemplo:

```javascript
const titulo = document.querySelector("h1");

console.log(titulo.textContent);
```

La propiedad `textContent` permite **leer o modificar el texto de un elemento**.

También podemos cambiar el texto:

```javascript
titulo.textContent = "Buscaminas iniciado";
```

Esto modifica directamente el contenido del HTML.

## Modificar clases CSS

JavaScript también puede modificar las clases de un elemento.

Para ello utilizamos `classList`.

```javascript
const panel = document.querySelector("#panel_inicio");

panel.classList.add("activo");
```

Esto añade una clase CSS.

También podemos eliminar clases:

```javascript
panel.classList.remove("activo");
```

O alternarlas:

```javascript
panel.classList.toggle("activo");
```

Este mecanismo será muy útil cuando queramos **mostrar u ocultar paneles de la aplicación**.

## Crear elementos desde JavaScript

El DOM también permite crear elementos nuevos.

Esto se hace mediante:

```
document.createElement()
```

Por ejemplo:

```javascript
const div = document.createElement("div");
```

Después podemos modificar su contenido:

```javascript
div.textContent = "Nueva celda";
```

Y finalmente añadirlo a la página:

```javascript
document.body.appendChild(div);
```

Este proceso será clave cuando generemos **las celdas del tablero del buscaminas**.

## Ejemplo práctico: crear elementos dinámicamente

Podemos probar un ejemplo sencillo en nuestro archivo `main.js`.

Modificamos temporalmente el contenido del archivo:

```javascript
function iniciarAplicacion() {

  const contenedor = document.createElement("div");

  contenedor.textContent = "La aplicación se ha iniciado correctamente";

  document.body.appendChild(contenedor);

}

iniciarAplicacion();
```

Cuando recarguemos la página veremos que JavaScript ha creado un nuevo elemento en el documento.

Esto demuestra que el código puede **modificar la estructura del HTML mientras la página está funcionando**.

## Añadir eventos a elementos

Otra de las funciones más importantes del DOM es detectar acciones del usuario.

Estas acciones se llaman **eventos**.

Algunos ejemplos de eventos son:

* `click`
* `dblclick`
* `keydown`
* `mouseover`

Podemos reaccionar a estos eventos mediante:

```
addEventListener()
```

Por ejemplo:

```javascript
const boton = document.querySelector("#carita");

boton.addEventListener("click", () => {
  console.log("Botón pulsado");
});
```

En este ejemplo estamos diciendo:

> Cuando el usuario haga clic en el botón, ejecuta esta función.

Este mecanismo será fundamental para el funcionamiento del juego.

Cada vez que el jugador pulse una celda del tablero se generará un evento `click`.

## Qué papel tendrá el DOM en el juego Buscaminas

El DOM será el encargado de conectar el código JavaScript con la interfaz visual del juego.

JavaScript se encargará de:

* generar el tablero
* actualizar el contador de minas
* actualizar el reloj
* mostrar las celdas abiertas
* mostrar las banderas
* mostrar las minas cuando termina la partida

En otras palabras, el DOM será el puente entre **la lógica del juego** y **lo que ve el usuario en la pantalla**.

## Qué hemos aprendido en este capítulo

En este capítulo hemos aprendido:

* qué es el DOM
* cómo el navegador representa el HTML
* cómo seleccionar elementos desde JavaScript
* cómo modificar contenido
* cómo modificar clases CSS
* cómo crear elementos dinámicamente
* cómo reaccionar a eventos del usuario

Estos conceptos nos permitirán empezar a construir partes reales del juego.

En el siguiente capítulo comenzaremos a generar **el tablero del Buscaminas dinámicamente desde JavaScript**, creando las primeras celdas del juego.

\pagebreak
