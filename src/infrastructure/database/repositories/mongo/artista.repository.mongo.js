const ArtistaRepository = require('../../../domain/repositories/artista/artista.repository');
const ArtistaMongo = require('../../mongo/artista');

class ArtistaRepositoryMongo extends ArtistaRepository {

    async create(data) {
        return await ArtistaMongo.create(data);
    }

    async findAll() {
        return await ArtistaMongo.find();
    }

    async findById(id) {
        return await ArtistaMongo.findById(id);
    }

    async update(id, data) {
        return await ArtistaMongo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ArtistaMongo.findByIdAndDelete(id);
    }
}

module.exports = ArtistaRepositoryMongo;
