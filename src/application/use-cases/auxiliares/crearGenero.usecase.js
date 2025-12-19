
const service = require('../../../domain/services/auxiliares/auxiliares.service.js');
class CrearGeneroUseCase {
    async execute(body) {
        return await service.crearGenero(body);
    }
}

module.exports = new CrearGeneroUseCase();
