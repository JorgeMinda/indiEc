const PageRepository = require('../../../../domain/repositories/page/page.repository');
const PageSQL = require('../../sql/page'); // tu modelo Sequelize

class PageRepositorySql extends PageRepository {

    async create(data) {
        return await PageSQL.create(data);
    }

    async findAll() {
        return await PageSQL.findAll();
    }

    async findById(id) {
        return await PageSQL.findByPk(id);
    }

    async update(id, data) {
        return await PageSQL.update(data, { where: { idPage: id } });
    }

    async delete(id) {
        return await PageSQL.destroy({ where: { idPage: id } });
    }
}

module.exports = PageRepositorySql;
