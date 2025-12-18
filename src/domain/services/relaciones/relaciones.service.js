const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');

class RelacionesService {

    async obtenerArtista(id) {
        return await orm.artista.findByPk(id);
    }

    async obtenerEvento(id) {
        return await orm.evento.findByPk(id);
    }

    async obtenerGrupo(id) {
        return await orm.grupoMusical.findByPk(id);
    }

    async asignarArtistaEvento(artista, evento) {
        return await artista.addEvento(evento);
    }

    async asignarArtistaGrupo(artista, grupo) {
        return await artista.addGrupoMusical(grupo);
    }

    async obtenerArtistasEvento(idEvento) {
        return await orm.evento.findByPk(idEvento, {
            include: [{
                model: orm.artista,
                through: { attributes: [] }
            }]
        });
    }

    async obtenerMiembrosGrupo(idGrupo) {
        return await orm.grupoMusical.findByPk(idGrupo, {
            include: [{
                model: orm.artista,
                through: { attributes: [] }
            }]
        });
    }
}

module.exports = new RelacionesService();
