const ClienteRepository = require('../../../domain/repositories/cliente/cliente.repository');
const ClienteMongo = require('../../mongo/cliente');

class ClienteRepositoryMongo extends ClienteRepository {

    async create(data) {
        return await ClienteMongo.create(data);
    }

    async findAll() {
        return await ClienteMongo.find();
    }

    async findById(id) {
        return await ClienteMongo.findById(id);
    }

    async update(id, data) {
        return await ClienteMongo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ClienteMongo.findByIdAndDelete(id);
    }
}

module.exports = ClienteRepositoryMongo;
