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
