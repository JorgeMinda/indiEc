const artistaService = require('../../../domain/services/artista/artista.service.js');

class EliminarArtistaUseCase {
    async execute(id) {
        return await artistaService.eliminarArtista(id);
    }
}

module.exports = new EliminarArtistaUseCase();
