const {
    obtenerCancionesUC,
    crearCancionUC,
    obtenerCancionesPorArtistaUC,
    actualizarCancionUC,
    eliminarCancionUC
} = require('../../../application/use-cases/cancion');

const cancionCtl = {};

cancionCtl.obtenerCanciones = async (req, res) => {
    try {
        const data = await obtenerCancionesUC();
        return res.apiResponse(data, 200, 'Canciones obtenidas exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError(error.message, 500);
    }
};

cancionCtl.obtenerCancionesPorArtista = async (req, res) => {
    try {
        const data = await obtenerCancionesPorArtistaUC(req.params.artistaId);
        return res.apiResponse(data, 200, 'Canciones del artista obtenidas');
    } catch (error) {
        console.error(error);
        return res.apiError(error.message, 500);
    }
};

cancionCtl.crearCancion = async (req, res) => {
    try {
        const data = await crearCancionUC(req);
        return res.apiResponse(data, 201, 'Canción creada exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError(error.message, 400);
    }
};

cancionCtl.actualizarCancion = async (req, res) => {
    try {
        const data = await actualizarCancionUC(req.params.id, req.body);
        return res.apiResponse(data, 200, 'Canción actualizada exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError(error.message, 500);
    }
};

cancionCtl.eliminarCancion = async (req, res) => {
    try {
        const data = await eliminarCancionUC(req.params.id);
        return res.apiResponse(data, 200, 'Canción eliminada exitosamente');
    } catch (error) {
        console.error(error);
        return res.apiError(error.message, 500);
    }
};

module.exports = cancionCtl;