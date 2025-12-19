const cancionService = require('../../../domain/services/cancion/cancion.service');

const obtenerCancionesUC = async () => {
    return await cancionService.obtenerCanciones();
};

const obtenerCancionesPorArtistaUC = async (idArtista) => {
    return await cancionService.obtenerCancionesPorArtista(idArtista);
};

const crearCancionUC = async (req) => {
    return await cancionService.crearCancion(req.body);
};

const actualizarCancionUC = async (id, datos) => {
    return await cancionService.actualizarCancion(id, datos);
};

const eliminarCancionUC = async (id) => {
    return await cancionService.eliminarCancion(id);
};

module.exports = {
    obtenerCancionesUC,
    obtenerCancionesPorArtistaUC,
    crearCancionUC,
    actualizarCancionUC,
    eliminarCancionUC
};