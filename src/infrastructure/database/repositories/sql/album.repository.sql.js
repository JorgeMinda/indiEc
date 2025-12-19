const AlbumRepository = require('../../../domain/repositories/album/album.repository');
const { album } = require('../../sql'); // importa tus modelos SQL

class AlbumRepositorySQL extends AlbumRepository {

    async create(data) {
        return await album.create(data);
    }

    async findAll() {
        return await album.findAll();
    }

    async findById(id) {
        return await album.findOne({ where: { idAlbum: id } });
    }

    async update(id, data) {
        await album.update(data, { where: { idAlbum: id } });
        return await this.findById(id);
    }

    async delete(id) {
        return await album.destroy({ where: { idAlbum: id } });
    }
}

module.exports = AlbumRepositorySQL;
