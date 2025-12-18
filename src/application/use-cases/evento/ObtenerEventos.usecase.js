const eventoService = require('../../../domain/services/evento/evento.service.js');

const obtenerEventosUseCase = async () => {
    try {
        return await eventoService.obtenerEventosSql();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = obtenerEventosUseCase;