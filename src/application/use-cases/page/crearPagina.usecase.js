const pageService = require('../../../domain/services/page/page.service');

class CrearPaginaUseCase {

    async execute(body) {
        const { 
            namePage, description, statePage,
            visionPage, misionPage, celularPage, correoPagina
        } = body;

        const datosSql = {
            namePage,
            description,
            statePage,
            createPage: new Date().toISOString()
        };

        const datosMongo = {
            visionPage,
            misionPage,
            celularPage,
            correoPagina,
            createPageMongo: new Date().toISOString()
        };

        const id = await pageService.crearPagina(datosSql, datosMongo);

        return { idPage: id };
    }
}

module.exports = new CrearPaginaUseCase();
