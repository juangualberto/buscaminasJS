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