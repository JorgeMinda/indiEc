const pageService = require('../../../domain/services/page/page.service');

class MostrarPaginaUseCase {

    async execute() {
        return await pageService.obtenerPagina();
    }
}

module.exports = new MostrarPaginaUseCase();
