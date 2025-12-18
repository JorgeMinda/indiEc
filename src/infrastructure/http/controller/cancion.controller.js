const {
    obtenerCancionesUC,
    crearCancionUC,
    obtenerCancionesPorArtistaUC
} = require('../../../application/use-cases/cancion');
const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose');
const { descifrarDatos, cifrarDatos } = require('../../../application/use-cases/auth/encrypDates');

const cancionCtl = {};

cancionCtl.obtenerCanciones = async (req, res) => {
    try {
        const data = await obtenerCancionesUC();
        return res.apiResponse(data, 200, 'Canciones obtenidas exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError('Error interno del servidor', 500);
    }
};

cancionCtl.crearCancion = async (req, res) => {
    try {
        const data = await crearCancionUC(req);
        return res.apiResponse(data, 201, 'Canción creada exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError('Error al crear la canción', 500);
    }
};

cancionCtl.obtenerCancionesPorArtista = async (req, res) => {
    try {
        const data = await obtenerCancionesPorArtistaUC(req.params.artistaId);
        return res.apiResponse(data, 200, 'Canciones del artista obtenidas exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError('Error interno del servidor', 500);
    }
};

module.exports = cancionCtl;
