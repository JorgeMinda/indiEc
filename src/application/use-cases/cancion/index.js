const CancionService = require('../../../domain/services/cancion/cancion.service.js');

const obtenerCancionesUC = async () => {
    return await CancionService.obtenerCancionesSql();
};

const crearCancionUC = async (req) => {
    return await CancionService.crearCancionSql(req);
};

const obtenerCancionesPorArtistaUC = async (id) => {
    return await CancionService.obtenerCancionesPorArtistaSql(id);
};

module.exports = {
    obtenerCancionesUC,
    crearCancionUC,
    obtenerCancionesPorArtistaUC
};
