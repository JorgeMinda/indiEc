const service = require('../../../domain/services/auxiliares/auxiliares.service.js');

class InicializarDatosUseCase {
    async execute() {
        return await service.inicializarDatos();
    }
}

module.exports = new InicializarDatosUseCase();
