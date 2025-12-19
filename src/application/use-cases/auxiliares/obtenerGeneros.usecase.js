const service = require('../../../domain/services/auxiliares/auxiliares.service.js');

class ObtenerGenerosUseCase {
    async execute() {
        return await service.obtenerGeneros();
    }
}

module.exports = new ObtenerGenerosUseCase();
