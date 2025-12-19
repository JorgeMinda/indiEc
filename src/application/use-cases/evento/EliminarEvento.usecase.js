// src/application/use-cases/evento/EliminarEvento.usecase.js
const eventoService = require('../../../domain/services/evento/evento.service.js');

const EliminarEvento = async (id) => {
    try {
        return await eventoService.eliminarEvento(id); // Implementarás esto en el service
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = EliminarEvento;