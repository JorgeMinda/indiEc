const AlbumRepository = require('../../../domain/repositories/album/album.repository');
const albumMongo = require('../../mongo/album');

class AlbumRepositoryMongo extends AlbumRepository {

    async create(data) {
        return await albumMongo.create(data);
    }

    async findAll() {
        return await albumMongo.find();
    }

    async findById(id) {
        return await albumMongo.findById(id);
    }

    async update(id, data) {
        return await albumMongo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await albumMongo.findByIdAndDelete(id);
    }

}

module.exports = AlbumRepositoryMongo;
