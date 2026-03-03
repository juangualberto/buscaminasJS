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
