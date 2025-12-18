const albumService = require('../../../domain/services/album/album.service.js');

class ObtenerAlbumesUseCase {
    async execute() {
        return await albumService.obtenerAlbumes();
    }
}

module.exports = new ObtenerAlbumesUseCase();
