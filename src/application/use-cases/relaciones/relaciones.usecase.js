const relacionesService = require('../../../domain/services/relaciones/relaciones.service.js');

class RelacionesUseCase {

    async asignarArtistaEvento({ artistaId, eventoId }) {
        const artista = await relacionesService.obtenerArtista(artistaId);
        const evento = await relacionesService.obtenerEvento(eventoId);

        if (!artista || !evento) {
            throw { status: 404, message: 'Artista o evento no encontrado' };
        }

        await relacionesService.asignarArtistaEvento(artista, evento);
        return true;
    }

    async obtenerArtistasEvento(eventoId) {
        const evento = await relacionesService.obtenerArtistasEvento(eventoId);

        if (!evento) {
            throw { status: 404, message: 'Evento no encontrado' };
        }

        return evento;
    }

    async asignarArtistaGrupo({ artistaId, grupoId }) {
        const artista = await relacionesService.obtenerArtista(artistaId);
        const grupo = await relacionesService.obtenerGrupo(grupoId);

        if (!artista || !grupo) {
            throw { status: 404, message: 'Artista o grupo no encontrado' };
        }

        await relacionesService.asignarArtistaGrupo(artista, grupo);
        return true;
    }

    async obtenerMiembrosGrupo(grupoId) {
        const grupo = await relacionesService.obtenerMiembrosGrupo(grupoId);

        if (!grupo) {
            throw { status: 404, message: 'Grupo no encontrado' };
        }

        return grupo;
    }
}

module.exports = new RelacionesUseCase();
