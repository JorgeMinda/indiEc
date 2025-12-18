const PageRepositorySql = require('../../../infrastructure/database/repositories/sql/page.repository.sql');
const PageRepositoryMongo = require('../../../infrastructure/database/repositories/mongo/page.repository.mongo');

const sqlRepo = new PageRepositorySql();
const mongoRepo = new PageRepositoryMongo();

class PageService {

    async obtenerPagina() {
        const paginasSql = await sqlRepo.findAll();
        const paginaSql = paginasSql[0]; // solo una

        if (!paginaSql) return { paginaSql: null, paginaMongo: null };

        const paginaMongo = await mongoRepo.findById(paginaSql.idPage);

        return { paginaSql, paginaMongo };
    }

    async crearPagina(datosSql, datosMongo) {
        const nueva = await sqlRepo.create(datosSql);
        const idPage = nueva.idPage;

        datosMongo.idPageSql = idPage;

        await mongoRepo.create(datosMongo);

        return idPage;
    }

    async actualizarPagina(id, datosSql, datosMongo) {
        await sqlRepo.update(id, datosSql);
        await mongoRepo.update(id, datosMongo);

        return true;
    }

    async eliminarPagina(id) {
        await sqlRepo.delete(id);
        await mongoRepo.delete(id);

        return true;
    }
}

module.exports = new PageService();
