const artistaService = require('../../../domain/services/artista/artista.service.js');

class CrearArtistaUseCase {
    async execute(datos, archivos) {
        return await artistaService.crearArtistaSql(datos, archivos);
        // return await artistaService.crearArtistaMongo(datos, archivos); // TODO: Crear este archivo
    }
}

module.exports = new CrearArtistaUseCase();
