const artistaService = require('../../../domain/services/artista/artista.service.js');

class CrearArtistaUseCase {
    async execute(datos, archivos) {
        return await artistaService.crearArtista(datos, archivos);
    }
}

module.exports = new CrearArtistaUseCase();
