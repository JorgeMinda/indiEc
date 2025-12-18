const obtenerArtistas = require('../../../application/use-cases/artista/obtenerArtistas.usecase');
const crearArtista = require('../../../application/use-cases/artista/crearArtista.usecase');
const obtenerArtistaPorId = require('../../../application/use-cases/artista/obtenerArtistaPorId.usecase');
const actualizarArtista = require('../../../application/use-cases/artista/actualizarArtista.usecase');
const eliminarArtista = require('../../../application/use-cases/artista/eliminarArtista.usecase');

const artistaCtl = {};

artistaCtl.obtenerArtistas = async (req, res) => {
    try {
        const data = await obtenerArtistas.execute();
        return res.apiResponse(data, 200, 'Artistas obtenidos exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

artistaCtl.crearArtista = async (req, res) => {
    try {
        const data = await crearArtista.execute(req.body, req.files);
        return res.apiResponse(data, 201, 'Artista creado exitosamente');
    } catch (error) {
        return res.apiError(error.message, 400);
    }
};

artistaCtl.obtenerArtistaPorId = async (req, res) => {
    try {
        const data = await obtenerArtistaPorId.execute(req.params.id);
        return res.apiResponse(data, 200, 'Artista encontrado');
    } catch (error) {
        return res.apiError(error.message, 404);
    }
};

artistaCtl.actualizarArtista = async (req, res) => {
    try {
        await actualizarArtista.execute(req.params.id, req.body);
        return res.apiResponse(null, 200, 'Artista actualizado exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

artistaCtl.eliminarArtista = async (req, res) => {
    try {
        await eliminarArtista.execute(req.params.id);
        return res.apiResponse(null, 200, 'Artista eliminado exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

module.exports = artistaCtl;
