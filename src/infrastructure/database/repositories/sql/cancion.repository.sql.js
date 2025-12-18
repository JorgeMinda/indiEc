const CancionRepository = require('../../../domain/repositories/cancion/cancion.repository');
const CancionSQL = require('../../sql/cancion'); // modelo Sequelize

class CancionRepositorySQL extends CancionRepository {

    async create(data) {
        return await CancionSQL.create(data);
    }

    async findAll() {
        return await CancionSQL.findAll();
    }

    async findById(id) {
        return await CancionSQL.findOne({ where: { idCancion: id } });
    }

    async update(id, data) {
        await CancionSQL.update(data, { where: { idCancion: id } });
        return this.findById(id);
    }

    async delete(id) {
        return await CancionSQL.destroy({ where: { idCancion: id } });
    }
}

module.exports = CancionRepositorySQL;
