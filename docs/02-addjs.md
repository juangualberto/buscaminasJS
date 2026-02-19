# Cómo incluir JavaScript correctamente (módulos)

## Forma moderna de incluir JavaScript

Actualmente, la forma recomendada de trabajar con JavaScript en el navegador es mediante módulos ES (ES Modules). Para ello, en el archivo index.html se utiliza la etiqueta script con el atributo type="module":

```html
<head>
  <script type="module" src="js/main.js"></script>
</head>
```

Al indicar type="module", el navegador interpreta el archivo como un módulo. Esto implica varias cosas importantes:

* El archivo puede usar las palabras clave import y export.
* El código se ejecuta en modo estricto automáticamente.
* El script se carga en diferido (de forma similar a defer), es decir, no bloquea el renderizado de la página y se ejecuta cuando el documento HTML ya ha sido procesado.
* Cada módulo tiene su propio ámbito, por lo que no contamina el espacio global.

Este será el enfoque que utilizaremos en el proyecto del Buscaminas.

## Estructura recomendada del proyecto

Una organización básica y profesional del proyecto podría ser:

```bash
/index.html
/js/main.js
/js/tablero.js
/js/minas.js
/js/ui.js
/css/styles.css
```

En esta estructura:

* *main.js* actúa como punto de entrada de la aplicación.
* Los demás archivos contienen partes específicas de la lógica (tablero, generación de minas, interfaz, etc.).
* El HTML solo enlaza con main.js.
* main.js se encarga de importar lo necesario.

## Exportar desde un módulo

Para que una función o variable pueda ser utilizada en otro archivo, debe exportarse.

Por ejemplo, en tablero.js:

```js
export function crearTablero(filas, columnas) {
console.log("Creando tablero:", filas, columnas);
}
```

También se puede exportar algo que ya esté definido:

```js
function generarMatriz(filas, columnas) {
return [];
}

export { generarMatriz };
```

Además, existe la exportación por defecto:

```js
function iniciarJuego() {
console.log("Juego iniciado");
}

export default iniciarJuego;
```

La exportación por defecto permite importar el elemento sin llaves y con el nombre que queramos.

## Importar en otro módulo

Para utilizar funciones exportadas, se usa la palabra clave import.

En main.js:

```js
import { crearTablero } from "./tablero.js";

crearTablero(8, 8);
```

Aspectos importantes:

* La ruta debe ser relativa (./ o ../).
* Es obligatorio indicar la extensión .js.
* El nombre debe coincidir exactamente con lo exportado, salvo en el caso de export default.

Si se usa export default:

```js
import iniciarJuego from "./juego.js";

iniciarJuego();
```

## Importar varios módulos

En un proyecto real es habitual dividir la lógica en varios archivos. Por ejemplo:

```js
import { crearTablero } from "./tablero.js";
import { colocarMinas } from "./minas.js";
import { actualizarMarcador } from "./ui.js";
```

Cada módulo se encarga de una responsabilidad concreta. Esto facilita la lectura, el mantenimiento y la ampliación del código.

Es importante que el archivo index.html solo cargue main.js. A partir de ahí, el resto de dependencias se gestionan mediante import.

Condiciones para que funcionen los módulos

Los módulos no funcionan correctamente si se abre el archivo HTML directamente con doble clic en algunos navegadores, debido a restricciones de seguridad (CORS).

Por ello, es recomendable trabajar con:

* Un servidor local (por ejemplo, Live Server en VS Code).
* Un servidor integrado en el editor.
* Un entorno de desarrollo que sirva los archivos por [http://localhost](http://localhost).

## Cómo usar jQuery

Aunque en la actualidad muchas funcionalidades de jQuery pueden hacerse con JavaScript moderno, es posible usar jQuery junto con módulos.

### Opción 1: Cargar jQuery desde index.html

En el archivo index.html:

```html
<head>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script type="module" src="js/main.js"></script>
</head>
```

En este caso:

* jQuery se carga primero.
* Se crea la variable global $.
* Después se carga main.js como módulo.

En main.js se puede usar directamente:

```js
$("#boton").on("click", () => {
alert("Hola desde jQuery");
});
```

Esta es la forma más sencilla si no se quiere complicar la configuración.

### Opción 2: Importar jQuery como módulo

Algunos CDN permiten importar jQuery como módulo ES. Por ejemplo:

```js
import $ from "[https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm](https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm)";

$("#boton").on("click", () => {
alert("Hola desde jQuery como módulo");
});
```

En este caso:

* jQuery se trata como cualquier otro módulo.
* No se usa variable global.
* El código queda más coherente con la arquitectura modular.

Sin embargo, esta opción requiere que el navegador pueda acceder a esa URL y que el entorno soporte correctamente módulos externos.

## Para el proyecto Buscaminas

* Es perfectamente viable trabajar solo con JavaScript moderno.
* El DOM actual ofrece métodos suficientes (querySelector, addEventListener, classList, etc.).
* El uso de módulos ayuda a estructurar el código desde el principio.
* jQuery puede explicarse como complemento, pero no es imprescindible.

En un proyecto moderno:

* index.html carga únicamente main.js como módulo.
* main.js importa el resto de archivos.
* Cada archivo exporta solo lo necesario.
* Se evita el uso de variables globales.
* El código queda organizado por responsabilidades.

Esta estructura es la base sobre la que construiremos el juego del Buscaminas.
