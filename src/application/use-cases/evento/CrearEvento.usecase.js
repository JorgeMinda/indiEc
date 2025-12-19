// src/application/use-cases/evento/CrearEvento.usecase.js
const eventoService = require('../../../domain/services/evento/evento.service.js');

const CrearEvento = async (data) => {
    try {
        // La función crearEvento ya hace SQL + Mongo
        await eventoService.crearEvento(data);
        return true;
    } catch (error) {
        console.error('Error en CrearEvento use case:', error);
        throw new Error(error.message || 'Error al crear evento');
    }
};

module.exports = CrearEvento;