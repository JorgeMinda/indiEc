const CancionRepository = require('../../../domain/repositories/cancion/cancion.repository');
const CancionMongo = require('../../mongo/cancion');

class CancionRepositoryMongo extends CancionRepository {

    async create(data) {
        return await CancionMongo.create(data);
    }

    async findAll() {
        return await CancionMongo.find();
    }

    async findById(id) {
        return await CancionMongo.findById(id);
    }

    async update(id, data) {
        return await CancionMongo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await CancionMongo.findByIdAndDelete(id);
    }
}

module.exports = CancionRepositoryMongo;
