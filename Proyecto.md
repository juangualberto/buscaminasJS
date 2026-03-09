# Exportación de código: Buscaminas 

## Estructura del proyecto

```text
src/
  index.html
  fonts/
    SFDigitalReadout-Heavy.ttf
  css/
    estilos.css
    fonts.css
  img/
    bandera.jpg
    bomba.png
    bombaAnulada.png
    bombaExplotada.png
    caritaBanderita.png
    caritaFeliz.png
    caritaGanar.png
    caritaPerder.png
    eight-cell.png
    empty-cell.png
    five-cell.png
    four-cell.png
    nothing-cell.png
    one-cell.png
    seven-cell.png
    six-cell.png
    three-cell.png
    two-cell.png
  js/
    controller.js
    index.js
    juego.js
    marcadores.js
    matriz.js
```

## Archivos


---

### css/estilos.css

```
#tablero {
  border-radius: 5px;
  width: 90%;
  margin: 0px auto;
}

body {
  background-color: rgb(230, 230, 230);
}

/* nav {
  background-color: rgb(230, 230, 230);
} */


div.controles {
  background-color: lightgrey;  
  padding: 1em;
  border: 0.5em;
  border-style: solid;
  border-color: grey;
  border-radius: 0.2em;
  box-shadow: 0.5em 0.5em lightgrey;  
  display: flex;
  align-items: center;
  justify-content: center;
}

@font-face {
  font-family: fuenteDigital;
  src:url(../fonts/SFDigitalReadout-Heavy.ttf);
}

div.reloj {
    color: red;
    background-color: black;
    padding: 0.5 em;
    border-color: grey;
    border: 0.2em;
    border-style: solid;   
    font-family: fuenteDigital;
    font-size: 200%;
    text-align:center;
    border-radius: 0.2em;
    margin-left: 0.7em;
    margin-right: 0.7em;
    width: 1.7em;
}


div.caraFeliz {
  background: url("../img/caritaFeliz.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0.1em auto; 
}

div.caraGanar {
  background: url("../img/caritaGanar.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
}

div.caraPerder {
  background: url("../img/caritaPerder.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
}

div.caraBanderita {
  background: url("../img/caritaBanderita.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
}

.vacio{
   background: rgb(114, 114, 114);
   box-shadow: inset 0 0 8px rgb(121, 120, 120);
   border: 2px outset rgb(172, 171, 171);
   height: 4em;
   width: 4em;
   background-color: rgb(223, 221, 221);
 }

 div.tablero_minas{
  /* margin: 0 auto; */
  margin-top: 1em;
  justify-content: center;
 }

 .bandera {
  background: url("../img/bandera.jpg") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .bomba {
  background: url("../img/bomba.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .bombaAnulada {
  background: url("../img/bombaAnulada.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .bombaExplotada {
  background: url("../img/bombaExplotada.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .oneCell {
  background: url("../img/one-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .twoCell {
  background: url("../img/two-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .threeCell {
  background: url("../img/three-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .fourCell {
  background: url("../img/four-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .fiveCell {
  background: url("../img/five-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .sixCell {
  background: url("../img/six-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .sevenCell {
  background: url("../img/seven-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .eightCell {
  background: url("../img/eight-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 .nothingCell {
  background: url("../img/nothing-cell.png") no-repeat center;
  background-size: 100% 100%;
	height: 4em;
  width: 4em;
  margin: 0 auto;
 }

 table {
  border-radius: 5px;
  margin: 0px auto;
  float: none;
}

div.contenedor_tablero {
  margin-top: 1em;
}

div.contenedor {
  margin: 0px auto;
  float: none;
}

table.marcadores {
  background-color: white;
}

.fondoBlanco {
  background-color: white;
}

/*color navbar personalizado*/
nav.bg-dark {
  background: linear-gradient(180deg,#0f1724 0%, #0b1220 100%);
  color: #e6eef8;
}

/* Footer personalizado */
footer.bg-dark {
  background: linear-gradient(180deg,#0f1724 0%, #0b1220 100%);
  color: #e6eef8;
}
footer h5 {
  font-weight: 600;
  color: #ffffff;
}
footer a {
  color: #dbeafe;
}
footer a:hover {
  color: #ffd166;
  text-decoration: none;
}
footer .bi {
  opacity: 0.95;
  vertical-align: -0.125em;
}
footer .border-secondary {
  border-color: rgba(255,255,255,0.08) !important;
}
@media (max-width: 576px) {
  footer .text-md-end { text-align: left !important; margin-top: 1rem; }
}
```

---

### css/fonts.css

```
#temporizador{
    font-family: SF-Digital-Readout;
    src: url(fonts/SFDigitalReadout-Heavy.ttf);
   }
```

---

### index.html

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Juan Gualberto">
        <meta name="copyright" content="GNU GPLv3">
        <title>Buscaminas</title>
       
        <link rel="stylesheet" href="css/estilos.css">
        <!-- Dependencias necesarias antes de cargar el módulo principal -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" 
            integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" 
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js" 
            integrity="sha512-TPh2Oxlg1zp+kz3nFA0C5vVC6leG/6mm1z9+mA81MI5eaUVqasPLO8Cuk4gMF4gUfP5etR73rgU/8PNMsSesoQ==" 
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.min.js" 
            integrity="sha512-nKXmKvJyiGQy343jatQlzDprflyB5c+tKCzGP3Uq67v+lmzfnZUi/ZT+fc6ITZfSC5HhaBKUIvr/nTLCV+7F+Q==" 
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

         <link rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css" 
            integrity="sha512-2bBQCjcnw658Lho4nlXJcc6WkV/UxpE/sAokbXPxQNGqmNdQrWqtw26Ns9kFF/yG792pKR1Sx8/Y1Lf1XN4GKA==" 
            crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- Cargar el módulo principal; éste importa sus dependencias internas -->
        <script type="module" src="js/index.js"></script>
    </head>
    <body>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light px-1">
            <a class="navbar-brand" href="#">Buscaminas</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a id="menu_inicio" class="nav-link" href="#">Inicio</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownPartida" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Partida
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownPartida">
                            <a id="menu_partida_facil" class="dropdown-item" href="#">Fácil</a>
                            <a id="menu_partida_medio" class="dropdown-item" href="#">Normal</a>
                            <a id="menu_partida_dificil" class="dropdown-item" href="#">Pesadilla</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a id="menu_puntuaciones" class="nav-link" href="#">Puntuaciones</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownAyuda" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ayuda
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownAyuda">
                            <a id="menu_ayuda" class="dropdown-item" href="#">Cómo jugar</a>
                            <a id="menu_licencia" class="dropdown-item" href="#">Licencia</a>
                            <a class="dropdown-item" href="https://github.com/juangualberto/tutorial-html5js"
                                target="_blank">Versión</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <div id="controles">
            <div class="d-flex justify-content-between">
                <div class="p-2">
                    <div id="minas" class="reloj">12</div>
                </div>
                <div class="p-2">
                    <div id="carita" class="cara caraGanar"></div>
                </div>
                <div class="p-2">
                    <div id="reloj" class="reloj">0</div>
                </div>
            </div>
        </div>
        <div class="container">       
            <div id="panel_inicio" class="panel">
                <br>
                <div class="jumbotron fondoBlanco">
                    <h1 class="display-4">Buscaminas</h1>
                    <p class="lead">Tutorial de introducción a HTML5, CSS3 y al pensamiento computacional con JavaScript.</p>
                    <hr class="my-4">
                    <p>Este juego es el resultado final de seguir el curso cuyos materiales, libro en PDF, página Web y vídeos se pueden encontrar pulsando en el botón de debajo.</p>
                    <p class="lead">
                      <a class="btn btn-secondary" href="https://github.com/juangualberto/tutorial-html5js" role="button">Aprender más...</a>
                    </p>
                </div>
            </div>
            <div id="panel_partida_facil" class="panel">
                <p>Partida Fácil</p>
            </div>
            <div id="panel_partida_medio" class="panel">
                <p>Partida Medio</p>
            </div>
            <div id="panel_partida_dificil" class="panel">
                <p>Partida Dificil</p>
            </div>
            <div id="panel_ayuda" class="panel">
                <p> Destapa casillas sin pisar una mina...</p>
            </div>
            <div id="panel_licencia" class="panel">
                <div> 
                    <p>Este curso ha sido realizado para ayudar a nuestros alumnos durante los meses de confinamiento por la pandemia del COVID-19. Primavera del 2020.</p>
                    <p><a href="http://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow"><img src="https://camo.githubusercontent.com/e170e276291254896665fa8f612b99fe5b7dd005/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792d73612f342e302f38387833312e706e67" alt="Licencia de Creative Commons" data-canonical-src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" style="max-width:100%;"></a><br>
                    Este obra está bajo una <a href="http://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">licencia de Creative Commons Reconocimiento-CompartirIgual 4.0 Internacional</a>.</p>
                    <p>Para seguir el curso te animamos a visitar este <a href="https://www.youtube.com/user/juanguedu" rel="nofollow">canal de Youtube</a> donde podrás de seguir estas explicaciones.</p>
                    <p>Si estás viendo una copia en formato PDF o ePub del libro, recuerda que siempre puedes acceder a la <a href="https://github.com/juangualberto/tutorial-html5js">última versión en el repositorio de Github</a>.</p>
                </div>
            </div>
            <div id="panel_puntuaciones" class="panel">
                <p>Puntuaciones</p>
            </div>
        </div>
    </div>
    
    <div id="modalGanar" class="modal fade" role="dialog">
        <div class="modal-dialog">
    
        <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">¡Has ganado!</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <p>Introduce tu nombre:</p>
            <input type="text" placeholder="Escribe tu nombre" id="nombreJugador" />
            <p>Puntos</p>
            <span id="puntosJugador"></span>
            <p>Tiempo</p>
            <span id="tiempoJugador"></span>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="salvarPuntos">Aceptar</button>
            </div>
        </div>
    
        </div>
    </div>

    <div id="modalFama" class="modal fade" role="dialog">
        <div class="modal-dialog">
    
        <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">Puntuaciones</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span id="listaJugadores"></span>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
        </div>
    
        </div>
    </div>

        <!-- Footer moderno -->
        <footer class="bg-dark text-light py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <h5 class="mb-2">Buscaminas</h5>
                        <p class="small mb-0">Tutorial de introducción a HTML5, CSS3 y pensamiento computacional con JavaScript.</p>
                    </div>
                    <div class="col-md-4 mb-3">
                        <h5 class="mb-2">Enlaces</h5>
                        <ul class="list-unstyled small mb-0">
                            <li><a href="#" class="text-decoration-none text-light">Inicio</a></li>
                            <li><a href="#" class="text-decoration-none text-light">Partida</a></li>
                            <li><a href="#" class="text-decoration-none text-light">Puntuaciones</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4 mb-3 text-md-end">
                        <h5 class="mb-2">Síguenos</h5>
                        <a href="https://github.com/juangualberto" class="text-light me-2" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-light me-2" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.673 6.673 0 0 0 16 3.542a6.56 6.56 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.797A3.286 3.286 0 0 0 7.88 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.381A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.615-.059 3.289 3.289 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/user/juanguedu" class="text-light" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                              <path d="M8.051 1.999h-.102C3.624 1.99 1.99 2.017 1.99 2.017S.5 2.09.5 4.6v6.8c0 2.51 1.49 2.583 1.49 2.583s1.633.027 6.459.027h.102c4.827 0 6.459-.027 6.459-.027s1.49-.073 1.49-2.583V4.6c0-2.51-1.49-2.583-1.49-2.583s-1.633-.027-6.459-.027zM6.4 10.4V5.6l4.2 2.4-4.2 2.4z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <hr class="border-secondary">
                <div class="d-flex justify-content-between small">
                    <div>© 2026 Juan Gualberto</div>
                    <div>Licencia: <a href="http://creativecommons.org/licenses/by-sa/4.0/" class="text-decoration-none text-light">CC BY-SA 4.0</a></div>
                </div>
            </div>
        </footer>
    </body>
</html>
```

---

### js/controller.js

```
/**
 * Biblioteca "casera" para hacer el "binding" de los menús
 * con las diferentes vistas de la APP.
 * Para usarla, basta con poner el mismo id a la entrada
 * del menú que a su vista asociada, pero cambiando el prefijo,
 * el menú debe ser menu_AAA y en la vista panel_AAA.
 */

const controller = {
    active_panel: "",

    /**
     * Gestiona qué panel está activo en cada momento (sólo puede haber uno)
     * @param {string} panel_name el selector del panel a activar
     */
    activate(panel_name) {
        console.log("cambio old::" + controller.active_panel + " new::" + panel_name);
        $(controller.active_panel).hide();
        $(panel_name).show();
        controller.active_panel = panel_name;
    },

    /**
     * Crea los handlers de los menús y los asocia con cada panel correspondiente.
     * @param {string} panel_inicial selector del panel inicial a mostrar
     */
    init(panel_inicial) {
        $('[id^="menu_"]').each(function () {
            var $this = $(this);
            var menu_id = $this.attr('id');
            var panel_id = menu_id.replace('menu_', 'panel_');

            $("#" + menu_id).click(function () {
                controller.activate("#" + panel_id);
            });
        });
        $(".panel").hide();
        controller.active_panel = panel_inicial;
        controller.activate(panel_inicial);
    }
};

// Mantener compatibilidad hacia atrás con jQuery namespace si existe $.
if (typeof $ !== 'undefined') {
    $.controller = controller;
}

export default controller;
```

---

### js/index.js

```
// Fichero index.js
import controller from './controller.js';
import Juego from './juego.js';


/**
 * Cuando la página se ha cargado entera, comenzamos:
 *     -  Inicializamos componentes
 *     -  Configuramos opciones
 *     -  Cargamos valores por defecto
 *     -  Etc... 
 */
$(function() {

    let juego = new Juego("#reloj","#minas","#carita", "#panel_puntuaciones");

    /**
     * Código para hacer que se cierre sólo el menú al pulsar sobre él
     */
    $('.navbar-nav li a').on('click', function(){
        if(!$( this ).hasClass('dropdown-toggle')){
        const collapseEl = document.querySelector('.navbar-collapse');
        if (collapseEl && window.bootstrap && typeof bootstrap.Collapse !== 'undefined') {
          const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
          bsCollapse.hide();
        }
        }
    });


    /**
     * Iniciamos el controlador que gestiona los eventos de
     * los menús y activa/desactiva las vistas
     */
    controller.init("#panel_inicio");


    const singleDoubleClick = (singleClk, doubleClk) => {
      let alreadyClicked = false;
      let alreadyClickedTimeout;
      return (e) => {
        if (alreadyClicked) {
          alreadyClicked = false;
          if (alreadyClickedTimeout) clearTimeout(alreadyClickedTimeout);
          doubleClk && doubleClk(e);
        } else {
          alreadyClicked = true;
          alreadyClickedTimeout = setTimeout(() => {
            alreadyClicked = false;
            singleClk && singleClk(e);
          }, 300);
        }
      };
    };

    const setDisparos = () => {
      $(document).off('click.singleDouble', 'td');
      $(document).on('click.singleDouble', 'td', singleDoubleClick((e) => {
        juego.disparo(e.target);
      }, (e) => {
        juego.cambiaBandera(e.target);
      }));
    };

    $("#menu_partida_facil").on('click', () => {
      juego.setTablero("#panel_partida_facil");
      juego.partida(5,5,1);
      setDisparos();
    });

    $("#menu_partida_medio").on('click', () => {
      juego.setTablero("#panel_partida_medio");
      juego.partida(8,8,8);
      setDisparos();
    });

    $("#menu_partida_dificil").on('click', () => {
      juego.setTablero("#panel_partida_dificil");
      juego.partida(10,10,10);
      setDisparos();
    });

    $("#carita").on('dblclick', () => {
      juego.partida();
      setDisparos();
    });

    $("#salvarPuntos").on('click', () => {
      console.log("Guardar puntos");
      juego.guardarPuntos();
      controller.activate("#panel_puntuaciones");
    });

});
```

---

### js/juego.js

```
// var $ = require('jQuery'); con ECMA7
import Marcadores from './marcadores.js';
import Matriz from './matriz.js';

/**
 * Esta clase gestiona la partida de Buscaminas
 */
export default class Juego {
    
    /**
     * Constructor, crea el objeto encargado del gestionar el juego y las partidas
     * 
     * @param {string} id_tiempo El identificador de la caja que va a contener 
     * el tiempo en segundos de la partida 
     * @param {string} id_minas El identificador donde está la caja que 
     * contiene el número de minas
     * @param {string} id_carita El identificador donde está el *smiley* que
     * va cambiando conforme evoluciona la partida
     * @param {string} id_tablero El identificador de la caja que va a contener la tabla
     * de las minas donde hacer clic
     */
    constructor(id_tiempo="#tiempo", id_minas="#minas", 
            id_carita="#carita", id_puntuaciones="#puntuaciones"){ //, id_tablero="#tablero"){
        this.caja_tiempo=$(id_tiempo);
        this.caja_minas=$(id_minas);
        this.caja_carita=$(id_carita);
        this.caja_puntuaciones=$(id_puntuaciones);   
        // this.caja_tablero=$(id_tablero);
        this.marcadores = new Marcadores();
        this.caja_puntuaciones.html(this.marcadores.getTabla());
        this.timer=null;
    }

    /**
     * Establece la caja donde vamos a colgar el tablero.
     * @param {DIV} id_tablero 
     */
    setTablero(id_tablero){
        this.old_caja_tablero = this.caja_tablero;
        this.caja_tablero = $(id_tablero);
    }

    /**
     * Arranca una nueva partida
     * @param {number} filas 
     * @param {number} columnas 
     * @param {number} minas 
     */
    partida(filas=10, columnas=10, minas=20){
        if (this.old_caja_tablero==undefined) {
            this.old_caja_tablero = $(this.id_tablero);
        } else {
            this.old_caja_tablero.empty();
        }
        this.caja_carita.removeAttr('class');
        this.caja_carita.addClass('caraBanderita');
        if ( this.matriz != undefined) {
            delete this.matriz;
        }
        this.matriz = new Matriz(filas, columnas);
        this.matriz.ponMinas(minas);
        this.minas = minas;
        this.filas = filas;
        this.columnas = columnas;
        this.aciertos = filas*columnas-minas;
        this.matriz.ponContadores();
        this.disparos = 0;
        this.caja_minas.html(minas);
        this.caja_tiempo.html(0);
        this.fin = false;
        this.perder = false;
        this.pintaTablero();
        // this.resuelve();

        clearInterval(this.timer);
        this.timer = setInterval(function(data){
            data.html( +(data.html())+ 1);
        }, 1000, this.caja_tiempo);
        
        this.matriz.imprimeMatriz();
    }

    /**
     * Destapa el tablero 
     * @param {boolean} perder 
     */
    resuelve(perder){
        this.fin = true;
        if (this.matriz!=undefined) {
            for (let i=0; i<this.matriz.getFilas();i++) {
                for (let j=0; j<this.matriz.getColumnas();j++){
                    if (this.matriz.get(i,j)==-1) {
                        let td = $("#celda_"+i+"_"+j);
                        td.removeAttr("class");
                        if (perder) td.addClass("bombaAnulada");
                        else td.addClass("bomba");
                    } else {
                        this.cambiaClase(i,j);
                    }
                }
            }
        }
    }

    guardarPuntos(){
        let filas =  this.filas;
        let columnas = this.columnas;
        let tiempo = (+this.caja_tiempo.html());
        let puntos = Math.floor( (filas*columnas)/(this.minas*this.minas)*100000/tiempo);
        this.marcadores.load();
        this.marcadores.addMarcador($('#nombreJugador').val(), 
            puntos, tiempo, filas, 
            columnas, this.minas);
        $('#puntosJugador').html(puntos);
        $('#tiempoJugador').html(tiempo);
        
        this.caja_puntuaciones.html(this.marcadores.getTabla());
        console.log(this.marcadores.getTabla());
    }

    cambiaBandera(caja){
        let seleccion = $("#"+caja.id);
        console.log(seleccion);
        if (seleccion.hasClass("vacio")) {
            seleccion.removeAttr("class");
            seleccion.addClass("bandera");
        } else {
            if (seleccion.hasClass("bandera")) {
                seleccion.removeAttr("class");
                seleccion.addClass("vacio");
            }
        }
    }

    resuelveCelda(i,j){
        
        if (this.aciertos>0){
            this.aciertos--;
            this.cambiaClase(i,j);
        } 
       
        if (!this.perder && this.disparos >= ((this.filas*this.columnas)-this.minas)){
             // hemos ganado!!
                this.resuelve(false);
                clearInterval(this.timer);
                this.caja_carita.removeAttr('class');
                this.caja_carita.addClass('caraGanar');
                // alert("Has ganado!!!");
                let tiempo = (+this.caja_tiempo.html());
                let filas =  this.filas;
                let columnas = this.columnas;
                let puntos = Math.floor( (this.minas*this.minas)/(filas*columnas*tiempo)*100000);
                $('#puntosJugador').html(puntos);
                $('#tiempoJugador').html(tiempo);
                $("#modalGanar").modal('show');
        } 

        if (this.matriz.get(i,j)==10 && !this.fin) {
            console.log("Abriendo vacíos...");
            if (i>0 && j>=0) {
                if (this.matriz.get(i-1,j)<10)
                    this.resuelveCelda(i-1, j);
            } 
            if (i>=0 && j>0) {
                if (this.matriz.get(i,j-1)<10)
                    this.resuelveCelda(i, j-1);
            }
            if (i>0 && j>0) {
                if (this.matriz.get(i-1,j-1)<10)
                    this.resuelveCelda(i-1, j-1);
            }
            if (i>0 && (j+1)<this.matriz.getColumnas()) {
                if (this.matriz.get(i-1,j+1)<10)
                    this.resuelveCelda(i-1, j+1);
            }
            if ((i+1)<this.matriz.getFilas() && j>0) {
                if (this.matriz.get(i+1,j-1)<10)
                    this.resuelveCelda(i+1, j-1);
            }
            if ((i+1)<this.matriz.getFilas() && j<this.matriz.getColumnas()){
                if (this.matriz.get(i+1,j)<10)
                    this.resuelveCelda(i+1, j);
            }
            if (i<this.matriz.getFilas() && (j+1)<this.matriz.getColumnas()){
                if (this.matriz.get(i,j+1)<10)
                    this.resuelveCelda(i, j+1);
            }
            if ((i+1)<this.matriz.getFilas() && (j+1)<this.matriz.getColumnas()){
                if (this.matriz.get(i+1,j+1)<10)
                    this.resuelveCelda(i+1, j+1);
            }
            if (i>0 && j>0) {
                if (this.matriz.get(i-1,j-1)<10)
                    this.resuelveCelda(i-1, j-1);
            }
        }
        
    }

    cambiaClase(i,j){
        if (this.matriz.get(i,j)<10) {
            this.disparos++;
        }
        let td = $("#celda_"+i+"_"+j);
        switch(this.matriz.get(i,j)){
            case -1:
                this.caja_carita.removeAttr('class');
                this.caja_carita.addClass('caraPerder');
                td.removeAttr("class");
                td.addClass("bombaExplotada");
                this.aciertos=-1;
                clearInterval(this.timer);
                // alert("Has perdido!!!");
                this.perder = true;
                this.matriz.set(i,j,-11);
                this.resuelve(true);
                break;
            case 1:
                td.removeAttr("class");
                td.addClass("oneCell");
                this.matriz.set(i,j,11);
                break;
            case 2:
                td.removeAttr("class");
                td.addClass("twoCell");
                this.matriz.set(i,j,12);
                break;
            case 3:
                td.removeAttr("class");
                td.addClass("threeCell");
                this.matriz.set(i,j,13);
                break;
            case 4:
                td.removeAttr("class");
                td.addClass("fourCell");
                this.matriz.set(i,j,14);
                break;
            case 5:
                td.removeAttr("class");
                td.addClass("fiveCell");
                this.matriz.set(i,j,15);
                break;
            case 6:
                td.removeAttr("class");
                td.addClass("sixCell");
                this.matriz.set(i,j,16);
                break;
            case 7:
                td.removeAttr("class");
                td.addClass("sevenCell");
                this.matriz.set(i,j,17);
                break;
            case 8:
                td.removeAttr("class");
                td.addClass("eigthCell");
                this.matriz.set(i,j,18);
                break;
            case 0: 
                td.removeAttr("class");
                td.addClass("nothingCell");
                this.matriz.set(i,j,10);
                break;
            default:
                this.aciertos++;
                // no hacer nada, ya está resuelta...
        }
    }

    disparo(caja) {
        // console.log("disparo"+caja);
        let cadena = caja.id;
        let pos = cadena.split("_");
        this.resuelveCelda(+pos[1],+pos[2]);
        // this.disparos++;
    }

    limpiaTablero() {
        if(this.caja_tablero!=undefined) {
            this.caja_tablero.empty();
            clearInterval(this.timer);
            this.caja_minas.html(this.matriz.getMinas());
        }
    }

    pintaTablero(){
        this.caja_tablero.empty();
        let mi_tabla = $("<table/>");
        
        // vamos a generar una tabla de n_filas por n_columnas
        for (let i=0; i<this.matriz.getFilas(); i++){
            // cada iteración de la i, se añade una fila
            let fila = $("<tr></tr>");
            for (let j=0; j<this.matriz.getColumnas(); j++){
                // cada iteración de la j, se añade una celda
                let celda = $("<td id=\"celda_"+i+"_"+j+"\">"+"</td>");
                celda.addClass("vacio");
                // celda.attr("onclick","alert(\'disparo en: "+i+","+j+"\')");
                fila.append(celda);
            }
            mi_tabla.append(fila);
        }
        this.caja_tablero.append(mi_tabla);
    }

}
```

---

### js/marcadores.js

```
/**
 * Esta clase gestiona los marcadores de un juego en LocalStorage
 */
export default class Marcadores {

    constructor() {
        this.lista = [];
        this.load();
    }

    addMarcador(nombre, puntos, tiempo, filas, columnas, minas) {
        const marcador = { nombre, filas, columnas, minas, tiempo, puntos };
        console.log(marcador);
        this.lista.push(marcador);
        this.lista.sort((a, b) => b.puntos - a.puntos);
        this.save();
    }

    load() {
        if (typeof localStorage !== 'undefined') {
            try {
                const listado = JSON.parse(localStorage.getItem('puntuaciones')) || [];
                listado.sort((a, b) => b.puntos - a.puntos);
                this.lista = listado;
            } catch (err) {
                console.error('Marcadores::load parse error', err);
                this.lista = [];
            }
        } else {
            throw new Error('Marcadores::load:: Almacenamiento no disponible');
        }
    }

    save() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('puntuaciones', JSON.stringify(this.lista));
        } else {
            throw new Error('Marcadores::save:: Almacenamiento no disponible');
        }
    }

    getTabla() {
        const limite = Math.min(this.lista.length, 20);
        let rows = '';
        for (let i = 0; i < limite; i++) {
            const m = this.lista[i];
            rows += `<tr><td>${i + 1}</td><td>${m.nombre}</td><td>${m.puntos}</td><td>${m.tiempo}</td></tr>`;
        }
        return `<table class='table marcadores'><thead><th>#</th><th>Nombre</th><th>Puntos</th><th>Tiempo</th></thead><tbody>${rows}</tbody></table>`;
    }

}
```

---

### js/matriz.js

```
/**
 * Librería JavaScript para el manejo de Matrices 2D
 * Ejemplo de uso: 
 * let mi_matriz = new Matriz(10, 10);
 * mi_matriz.inicializa();
 * mi_matriz.ponMinas(20);
 * mi_matriz.ponContadores();
 * 
 * 
 */

export default class Matriz {
    

    /**
     * Constructor, aloja espacio en memoria para 
     * una matriz de filas * columnas.
     * 
     * @param {number} filas número de filas de la matriz. 
     * Si no se pasa valor (undefined) por defecto es 20.
     * @param {number} columnas número de columnas de la matriz.
     * Si no se pasa valor (undefined) por defecto es 20.
     */

    constructor(filas=20, columnas=20){
        this._filas = filas;
        this._columnas = columnas;
        this._data = [];
        for (let i=0; i<filas;i++){
            this._data.push(new Array(columnas).fill(0));
        }
    }

    /**
     * Método para (re)inicializar la matriz con un valor determinado.
     * Para el Buscaminas debe ser 0. Si no le pasamos nada por defecto 
     * será 0.
     * 
     * @param {number} valor El dato con el que vamos a rellenar toda la matriz
     */
    inicializa(valor = 0){
        for (let i = 0; i < this._data.length; i++) {
            this._data[i].fill(valor);
        }
    }
    
    /**
     * Coloca n_minas (con valor -1) en la matriz.
     * 
     * @param {number} n_minas número de minas a colocar. 
     */
    ponMinas(n_minas){
        // Como mínimo que tengamos que poner una mina
        let max_minas = Math.floor( (this._columnas * this._filas) / 3);
        if ( (n_minas >= 1) && (n_minas < max_minas) ) {
            this._minas=n_minas;
            do {
                // con LET estas variables sólo tienen como ámbito este bloque
                let pos_fil = this.dado(this._filas);
                let pos_col = this.dado(this._columnas);
                // console.log("Matriz::ponMinas: intentando colocar mina en: "+pos_fil+","+pos_col);
                // compruebo si no había mina previa
                if (this._data[pos_fil][pos_col]!=(-1)){
                    this._data[pos_fil][pos_col]=(-1);
                    n_minas--;
                }
            } while (n_minas>0);
        } else {
            // enviar mensaje de error
            throw new Error("Matriz::ponMinas:: número de minas no válido");
        }
    }

    /**
     * Este método genera un aleatorio entre 0 y valor-1
     * 
     * @param {number} valor genera un aleatorio entre 0 y valor-1
     */
    dado(valor) {
        const tmp = Math.floor(Math.random() * valor);
        return tmp;
    }

    /**
     * Métodos para hacer las comprobaciones acerca de las minas
     */
    miraNorte(i,j){
        return this._data[i-1][j]==-1?1:0;
    }
    miraNO(i,j){
        return this._data[i-1][j-1]==-1?1:0;
    }
    miraNE(i,j){
        return this._data[i-1][j+1]==-1?1:0;
    }
    miraEste(i,j){
        return this._data[i][j+1]==-1?1:0;
    }
    miraSE(i,j){
        return this._data[i+1][j+1]==-1?1:0;
    }
    miraSur(i,j){
        return this._data[i+1][j]==-1?1:0;
    }
    miraSO(i,j){
        return this._data[i+1][j-1]==-1?1:0;
    }
    miraOeste(i,j){
        return this._data[i][j-1]==-1?1:0;
    }

    /**
     * Métodos para mostrar celdas vacías(sin números ni minas)
     */
    checkNorte(i,j){
        return this._data[i-1][j];
    }
    checkNO(i,j){
        return this._data[i-1][j-1];
    }
    checkNE(i,j){
        return this._data[i-1][j+1];
    }
    checkEste(i,j){
        return this._data[i][j+1];
    }
    checkSE(i,j){
        return this._data[i+1][j+1];
    }
    checkSur(i,j){
        return this._data[i+1][j];
    }
    checkSO(i,j){
        return this._data[i+1][j-1];
    }
    checkOeste(i,j){
        return this._data[i][j-1];
    }

    /**
     * Este método pone los contadores de las minas 
     * que hay alrededor de cada casilla.
     */
    ponContadores(){
        for (let i=0; i<this._data.length; i++){
            for(let j=0; j<this._data[i].length; j++){
                if (this._data[i][j]!=-1) { // sólo si no hay mina hacemos las cuentas...
                    if (i==0) { // estamos en la primera fila
                        if (j==0) { // estamos en la primera columna
                            // miramos sólo a la derecha y abajo
                            this._data[i][j]+=this.miraEste(i,j);
                            this._data[i][j]+=this.miraSE(i,j);
                            this._data[i][j]+=this.miraSur(i,j);
                        } else {
                            if (j==(this._columnas-1)) { // estamos en la última columna
                                // miramos abajo y a izquierda
                                this._data[i][j]+=this.miraOeste(i,j);
                                this._data[i][j]+=this.miraSO(i,j);
                                this._data[i][j]+=this.miraSur(i,j);
                            } else { // estamos en las columnas centrales
                                // miramos a derecha, izquierda y abajo
                                this._data[i][j]+=this.miraOeste(i,j);
                                this._data[i][j]+=this.miraEste(i,j);
                                this._data[i][j]+=this.miraSO(i,j);
                                this._data[i][j]+=this.miraSE(i,j);
                                this._data[i][j]+=this.miraSur(i,j);
                            }
                        }
                    } else {
                        if (i==(this._filas-1)) { // estamos en la última fila
                            if (j==0) { // estamos en la primera columna
                                // miramos sólo arriba y derecha
                                this._data[i][j]+=this.miraNorte(i,j);
                                this._data[i][j]+=this.miraNE(i,j);
                                this._data[i][j]+=this.miraEste(i,j);
                            } else {
                                if (j==(this._columnas-1)) { // estamos en la última columna
                                    // miramos a la izquierda y arriba
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                } else { // estamos en las columnas centrales
                                    // miramos a derecha, izquierda y arriba
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                    this._data[i][j]+=this.miraEste(i,j);
                                    this._data[i][j]+=this.miraNE(i,j);
                                }
                            }
                        } else { // estamos en las filas centrales
                            if (j==0) { // estamos en la primera columna
                                // arriba, abajo y a la derecha
                                this._data[i][j]+=this.miraNorte(i,j);
                                this._data[i][j]+=this.miraSur(i,j);
                                this._data[i][j]+=this.miraSE(i,j);
                                this._data[i][j]+=this.miraEste(i,j);
                                this._data[i][j]+=this.miraNE(i,j);
                            } else {
                                if (j==(this._columnas-1)) { // estamos en la última columna
                                    // arriba, abajo y a la izquierda
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                    this._data[i][j]+=this.miraSO(i,j);
                                    this._data[i][j]+=this.miraSur(i,j);

                                } else { // estamos en las columnas centrales
                                    // arriba, abajo, derecha e izquierda
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                    this._data[i][j]+=this.miraSO(i,j);
                                    this._data[i][j]+=this.miraSur(i,j);
                                    this._data[i][j]+=this.miraSE(i,j);
                                    this._data[i][j]+=this.miraEste(i,j);
                                    this._data[i][j]+=this.miraNE(i,j);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Método para consultar la posición [i,j]
     * de la matriz del tablero del Buscaminas.
     * @param {number} i Posición de la fila en el tablero.
     * @param {number} j Posición de la columna en el tablero.
     */
    get(i,j){
        if (i>=0 && i<this._filas && j>=0 && j<this._columnas) {
            return this._data[i][j];
        } else {
            throw new Error("Matriz::get: Ha intentado acceder a una posición no válida.");
        }
    }

    /**
     * Método para almacenar un dato en la posición [i,j]
     * de la matriz del tablero del Buscaminas. Si no se 
     * pasa el parámetro dato por defecto será 0.
     * @param {number} i posición (fila)
     * @param {number} j posición (columna)
     * @param {number} dato Si no se indica, por defecto será 0.
     */
    set(i,j,dato=0) {
        if (i>=0 && i<this._filas && j>=0 && j<this._columnas) {
            this._data[i][j]=dato;
        } else {
            throw new Error("Matriz::set: Ha intentado acceder a una posición no válida.");
        }
    }

    getFilas(){
        return this._filas;
    }

    getColumnas(){
        return this._columnas;
    }

    getMinas(){
        return this._minas;
    }

    imprimeMatriz(){
        let texto = "";
        for (let i = 0; i < this._data.length; i++){
            for (let j = 0; j < this._data[i].length; j++){
                texto += "\t" + this._data[i][j];
            }
            texto += "\n";
        }
        console.log(texto);
    }

}
```
