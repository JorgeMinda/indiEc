const artistaService = require('../../../domain/services/artista/artista.service.js');

class ObtenerArtistaPorIdUseCase {
    async execute(id) {
        return await artistaService.obtenerArtistaPorIdSql(id);
    }
}

module.exports = new ObtenerArtistaPorIdUseCase();
