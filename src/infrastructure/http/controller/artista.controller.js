const obtenerArtistas = require('../../../application/use-cases/artista/obtenerArtistas.usecase');
const crearArtista = require('../../../application/use-cases/artista/crearArtista.usecase');
const obtenerArtistaPorId = require('../../../application/use-cases/artista/obtenerArtistaPorId.usecase');
const actualizarArtista = require('../../../application/use-cases/artista/actualizarArtista.usecase');
const eliminarArtista = require('../../../application/use-cases/artista/eliminarArtista.usecase');
const artistaService = require('../../../domain/services/artista/artista.service');

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
        const data = await actualizarArtista.execute(req.params.id, req.body);
        return res.apiResponse(data, 200, 'Artista actualizado exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

artistaCtl.eliminarArtista = async (req, res) => {
    try {
        const data = await eliminarArtista.execute(req.params.id);
        return res.apiResponse(data, 200, 'Artista eliminado exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

// NUEVO - Subir foto
artistaCtl.subirFoto = async (req, res) => {
    try {
        if (!req.files || !req.files.photo) {
            return res.apiError('No se proporcionó ninguna imagen', 400);
        }
        const data = await artistaService.subirFoto(req.params.id, req.files.photo);
        return res.apiResponse(data, 200, 'Foto actualizada exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

module.exports = artistaCtl;