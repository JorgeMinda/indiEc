const PageRepository = require('../../../../domain/repositories/page/page.repository');
const PageMongo = require('../../mongo/page'); // tu modelo mongoose

class PageRepositoryMongo extends PageRepository {

    async create(data) {
        return await PageMongo.create(data);
    }

    async findAll() {
        return await PageMongo.find();
    }

    async findById(sqlId) {
        return await PageMongo.findOne({ idPageSql: sqlId });
    }

    async update(sqlId, data) {
        return await PageMongo.updateOne({ idPageSql: sqlId }, data);
    }

    async delete(sqlId) {
        return await PageMongo.deleteOne({ idPageSql: sqlId });
    }
}

module.exports = PageRepositoryMongo;
