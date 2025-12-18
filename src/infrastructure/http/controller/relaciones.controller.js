const relacionesUseCase = require('../../../application/use-cases/relaciones/relaciones.usecase.js');

const relacionesCtl = {};

relacionesCtl.asignarArtistaEvento = async (req, res) => {
    try {
        await relacionesUseCase.asignarArtistaEvento(req.body);
        return res.apiResponse(null, 200, 'Artista asignado al evento exitosamente');
    } catch (error) {
        return res.apiError(error.message, error.status || 500);
    }
};

relacionesCtl.obtenerArtistasEvento = async (req, res) => {
    try {
        const evento = await relacionesUseCase.obtenerArtistasEvento(req.params.eventoId);
        return res.apiResponse(evento, 200, 'Artistas del evento obtenidos');
    } catch (error) {
        return res.apiError(error.message, error.status || 500);
    }
};

relacionesCtl.asignarArtistaGrupo = async (req, res) => {
    try {
        await relacionesUseCase.asignarArtistaGrupo(req.body);
        return res.apiResponse(null, 200, 'Artista asignado al grupo exitosamente');
    } catch (error) {
        return res.apiError(error.message, error.status || 500);
    }
};

relacionesCtl.obtenerMiembrosGrupo = async (req, res) => {
    try {
        const grupo = await relacionesUseCase.obtenerMiembrosGrupo(req.params.grupoId);
        return res.apiResponse(grupo, 200, 'Miembros del grupo obtenidos');
    } catch (error) {
        return res.apiError(error.message, error.status || 500);
    }
};

module.exports = relacionesCtl;
