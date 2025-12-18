const eventoService = require('../../../domain/services/evento/evento.service.js');

const crearEventoUseCase = async (data) => {
    try {
        await eventoService.crearEventoSql(data);
        await eventoService.crearEventoMongo(data); // TODO: Implementar cuando se implemente el servicio de MongoDB
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = crearEventoUseCase;