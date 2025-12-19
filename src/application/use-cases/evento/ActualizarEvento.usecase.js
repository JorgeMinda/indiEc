// src/application/use-cases/evento/ActualizarEvento.usecase.js
const eventoService = require('../../../domain/services/evento/evento.service.js');

const ActualizarEvento = async (id, data) => {
    try {
        return await eventoService.actualizarEvento(id, data); // Implementarás esto en el service
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = ActualizarEvento;