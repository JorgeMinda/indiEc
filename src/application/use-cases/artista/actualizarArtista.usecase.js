const artistaService = require('../../../domain/services/artista/artista.service.js');

class ActualizarArtistaUseCase {
    async execute(id, datos) {
        return await artistaService.actualizarArtista(id, datos);
    }
}

module.exports = new ActualizarArtistaUseCase();
