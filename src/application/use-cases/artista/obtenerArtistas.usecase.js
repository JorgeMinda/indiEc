const artistaService = require('../../../domain/services/artista/artista.service.js');

class ObtenerArtistasUseCase {
    async execute() {
        return await artistaService.obtenerArtistas();
    }
}

module.exports = new ObtenerArtistasUseCase();
