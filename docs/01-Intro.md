# Introducción a la programación con JavaScript

El propósito de este manual es la realización un Buscaminas utilizando JavaScript moderno con módulos. 

## Introducción

Cuando visitamos una página web moderna, no solo vemos información estática. Las páginas actuales reaccionan a nuestras acciones: podemos pulsar botones, enviar formularios, abrir menús, jugar a juegos o interactuar con aplicaciones completas.

Todo este comportamiento interactivo es posible gracias a **JavaScript**.

JavaScript es el lenguaje de programación que permite añadir **lógica y comportamiento** a una página web.

En el desarrollo web moderno existen tres tecnologías fundamentales:

| Tecnología     | Función                                   |
| -------------- | ----------------------------------------- |
| **HTML**       | Define la estructura de la página         |
| **CSS**        | Define el diseño y la apariencia          |
| **JavaScript** | Define el comportamiento y la interacción |

Podemos imaginar una página web como una casa:

* **HTML** sería la estructura: paredes, puertas, habitaciones.
* **CSS** sería la decoración: colores, muebles, iluminación.
* **JavaScript** sería la electricidad y los mecanismos: interruptores, puertas automáticas, sensores, etc.

Sin JavaScript, la mayoría de las páginas web serían simplemente documentos estáticos.

## ¿Qué es exactamente JavaScript?

JavaScript es un **lenguaje de programación interpretado** diseñado inicialmente para ejecutarse dentro del navegador web.

Fue creado en **1995 por Brendan Eich** mientras trabajaba en Netscape. El objetivo era permitir que las páginas web pudieran responder a las acciones del usuario sin tener que recargar completamente la página.

Hoy en día JavaScript se ha convertido en uno de los lenguajes más utilizados del mundo.

Con JavaScript podemos:

* Detectar cuando el usuario hace clic en un botón
* Validar formularios
* Modificar el contenido de una página sin recargarla
* Crear animaciones
* Construir aplicaciones web completas
* Desarrollar juegos en el navegador

En este tema aprenderemos JavaScript utilizando un ejemplo práctico: **el desarrollo de un juego de Buscaminas en el navegador**.

## ¿Dónde se ejecuta JavaScript?

En este módulo trabajaremos con JavaScript que se ejecuta en el **navegador web**.

Los navegadores modernos incluyen un **motor de JavaScript** que es capaz de interpretar y ejecutar el código.

Cada navegador tiene su propio motor:

| Navegador | Motor de JavaScript |
| --------- | ------------------- |
| Chrome    | V8                  |
| Edge      | V8                  |
| Firefox   | SpiderMonkey        |
| Safari    | JavaScriptCore      |

Cuando abrimos una página web ocurre el siguiente proceso:

1. El navegador descarga el archivo **HTML**
2. Construye la estructura interna de la página
3. Carga los archivos **CSS**
4. Ejecuta los scripts de **JavaScript**

JavaScript puede entonces:

* Leer el contenido de la página
* Modificar elementos
* responder a eventos del usuario

Este modelo de ejecución es lo que hace posible que una página web sea **interactiva**.


## El DOM: cómo ve el navegador una página web

Para poder manipular una página web, el navegador necesita representar el HTML internamente.

Esta representación se llama **DOM (Document Object Model)**.

El DOM es una estructura en forma de árbol donde cada elemento del HTML se convierte en un objeto que JavaScript puede manipular.

Por ejemplo, si tenemos este HTML:

```html
<body>
  <h1>Título</h1>
  <button>Pulsar</button>
</body>
```

El navegador lo interpreta como una estructura de objetos:

```text
Document
└── body
    ├── h1
    └── button
```

JavaScript puede acceder a esos elementos y modificarlos.

Por ejemplo, podemos cambiar el texto de un botón, ocultar un elemento o añadir nuevos elementos a la página.

El DOM es uno de los conceptos más importantes en programación web, ya que es el puente entre **JavaScript y el contenido HTML**.

## Primer ejemplo: un botón interactivo

Vamos a crear un primer ejemplo sencillo para entender cómo JavaScript interactúa con el HTML.

Creamos un archivo `index.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Primer ejemplo JavaScript</title>
</head>

<body>

<h1>Primer ejemplo con JavaScript</h1>

<button id="boton">Pulsa aquí</button>

<script>

const boton = document.querySelector("#boton");

boton.addEventListener("click", () => {
  alert("Hola mundo desde JavaScript");
});

</script>

</body>
</html>
```

Cuando el usuario pulsa el botón ocurre lo siguiente:

1. JavaScript localiza el botón en el DOM
2. Escucha el evento **click**
3. Cuando se produce el clic, ejecuta una función
4. La función muestra un mensaje en pantalla


## Analizando el código paso a paso

Veamos las partes más importantes del código.

### Seleccionar un elemento del DOM

```javascript
const boton = document.querySelector("#boton");
```

Aquí estamos utilizando `document.querySelector()` para buscar un elemento en la página.

El símbolo `#` indica que estamos buscando un **id**.

En este caso seleccionamos el botón cuyo id es `boton`.


### Escuchar un evento

```javascript
boton.addEventListener("click", () => {
```

Los navegadores generan **eventos** cuando el usuario interactúa con la página.

Algunos ejemplos de eventos son:

* `click`
* `keydown`
* `mouseover`
* `submit`

En este caso estamos diciendo:

> Cuando el usuario haga clic en el botón, ejecuta esta función.

### Ejecutar una acción

```javascript
alert("Hola mundo desde JavaScript");
```

La función `alert()` muestra una ventana emergente con un mensaje.

Aunque no se usa mucho en aplicaciones reales, es muy útil para aprender cómo funciona JavaScript.

## Qué hemos aprendido

En este primer capítulo hemos visto los conceptos fundamentales:

* Qué es JavaScript
* Para qué se utiliza en una página web
* Dónde se ejecuta
* Qué es el DOM
* Cómo JavaScript puede reaccionar a las acciones del usuario

También hemos creado nuestro **primer programa interactivo**.

## Resultado práctico

Después de este capítulo ya somos capaces de:

* Crear un archivo HTML
* Incluir código JavaScript
* Seleccionar elementos del DOM
* Detectar eventos del usuario
* Ejecutar acciones cuando ocurre un evento

Estos conceptos serán la base para comenzar a construir el juego del **Buscaminas** paso a paso.

En el siguiente capítulo aprenderemos cómo incluir JavaScript correctamente utilizando **módulos**, que es la forma moderna de organizar proyectos JavaScript.

\pagebreak
