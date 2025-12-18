const artistaService = require('../../../domain/services/artista/artista.service.js');

class EliminarArtistaUseCase {
    async execute(id) {
        return await artistaService.eliminarArtistaSql(id);
        // return await artistaService.eliminarArtistaMongo(id); // TODO: Crear este archivo
    }
}

module.exports = new EliminarArtistaUseCase();
