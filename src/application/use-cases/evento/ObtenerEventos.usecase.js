// src/application/use-cases/evento/ObtenerEventos.usecase.js
const eventoService = require('../../../domain/services/evento/evento.service.js');

const ObtenerEventos = async () => {
    try {
        const eventos = await eventoService.obtenerEventosCompletos();
        console.log('Use case ObtenerEventos devolviendo:', eventos); // Para depurar en consola del backend
        return eventos || [];
    } catch (error) {
        console.error('Error en use case ObtenerEventos:', error);
        return [];
    }
};

module.exports = ObtenerEventos;