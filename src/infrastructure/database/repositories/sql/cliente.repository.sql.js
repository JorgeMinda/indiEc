const ClienteRepository = require('../../../domain/repositories/cliente/cliente.repository');
const ClienteSQL = require('../../sql/cliente'); // modelo Sequelize

class ClienteRepositorySQL extends ClienteRepository {

    async create(data) {
        return await ClienteSQL.create(data);
    }

    async findAll() {
        return await ClienteSQL.findAll();
    }

    async findById(id) {
        return await ClienteSQL.findOne({ where: { idClientes: id } });
    }

    async update(id, data) {
        await ClienteSQL.update(data, { where: { idClientes: id } });
        return this.findById(id);
    }

    async delete(id) {
        return await ClienteSQL.destroy({ where: { idClientes: id } });
    }
}

module.exports = ClienteRepositorySQL;
