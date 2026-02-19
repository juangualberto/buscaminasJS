# ¿Qué es JavaScript y dónde se ejecuta?

## ¿Qué es JavaScript?

JavaScript (JS) es el lenguaje de programación que permite añadir **interactividad y comportamiento** a una página web.

Si HTML define la estructura y CSS el diseño, JavaScript añade:

- Eventos (clics, teclado, ratón…)
- Cambios dinámicos en la página
- Validaciones de formularios
- Juegos y aplicaciones web

## ¿Dónde se ejecuta?

En este módulo trabajaremos con JavaScript en el **navegador web**.

Cada navegador moderno incorpora un motor de JavaScript:

- Chrome → Motor V8  
- Firefox → SpiderMonkey  
- Edge → V8  
- Safari → JavaScriptCore  

El navegador:

1. Descarga el archivo HTML  
2. Construye el DOM  
3. Ejecuta el código JavaScript  


## Relación entre HTML, CSS y JavaScript

| Tecnología | Función |
|------------|----------|
| HTML | Estructura |
| CSS | Estilo |
| JavaScript | Comportamiento |

Ejemplo sencillo:

```html
<button id="boton">Pulsa aquí</button>

<script type="module">
  const boton = document.querySelector("#boton");
  boton.addEventListener("click", () => {
    alert("Hola mundo");
  });
</script>
```

En este ejemplo:

* HTML crea el botón
* JavaScript detecta el clic
* El navegador ejecuta el código

## Antes y ahora: ¿dónde se coloca el `<script>`?

### Antes (JavaScript clásico)

Tradicionalmente se colocaba el `<script>` **justo antes de cerrar el `<body>`**:

```html
<body>
  ...
  <script src="main.js"></script>
</body>
```

¿Por qué?

Porque si el script se cargaba en el `<head>`, el navegador intentaba ejecutar el código antes de que el HTML estuviera completamente cargado, lo que provocaba errores al intentar acceder a elementos que aún no existían.

### Ahora (JavaScript moderno con módulos)

Hoy usamos:

```html
<head>
  <script type="module" src="js/main.js"></script>
</head>
```

Los módulos:

* Se cargan **en diferido automáticamente**
* Esperan a que el HTML esté construido
* No bloquean el renderizado

Por eso ahora es correcto (y recomendable) incluir el script en el `<head>` cuando usamos `type="module"`.

## Cómo se incluye JavaScript hoy (forma moderna)

Usaremos **módulos**:

```html
<script type="module" src="js/main.js"></script>
```

Ventajas:

* Evita variables globales
* Permite dividir el código en archivos
* Se ejecuta en modo estricto automáticamente
* No bloquea la carga de la página

Esta es la forma recomendada en navegadores modernos.

## Recuerda

JavaScript:

* No modifica el diseño (eso es CSS)
* No define la estructura (eso es HTML)
* Se encarga del comportamiento y la lógica

En este tema aprenderemos lo necesario para poder construir un juego como **Buscaminas** usando JavaScript moderno.
