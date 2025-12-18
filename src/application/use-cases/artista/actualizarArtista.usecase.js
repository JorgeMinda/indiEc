const artistaService = require('../../../domain/services/artista/artista.service.js');

class ActualizarArtistaUseCase {
    async execute(id, datos) {
        return await artistaService.actualizarArtistaSql(id, datos);
        // return await artistaService.actualizarArtistaMongo(id, datos); // TODO: Crear este archivo  
    }
}

module.exports = new ActualizarArtistaUseCase();
