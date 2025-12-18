const ObtenerGrupos = require('../../../application/use-cases/grupoMusical/ObtenerGruposMusicales.usecase.js');
const CrearGrupo = require('../../../application/use-cases/grupoMusical/CrearGrupoMusical.usecase.js');
const ActualizarGrupo = require('../../../application/use-cases/grupoMusical/ActualizarGrupoMusical.usecase.js');
const EliminarGrupo = require('../../../application/use-cases/grupoMusical/EliminarGrupoMusical.usecase.js');

const grupoMusicalCtl = {};

grupoMusicalCtl.mostrarGrupos = async (req, res) => {
    try {
        const data = await ObtenerGrupos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

grupoMusicalCtl.crearGrupo = async (req, res) => {
    try {
        const body = {
            ...req.body,
            imagen: req.files?.imagen?.name || null
        };

        const id = await CrearGrupo(body);
        res.json({ message: 'Grupo creado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

grupoMusicalCtl.actualizarGrupo = async (req, res) => {
    try {
        const id = req.params.id;
        const body = {
            ...req.body,
            imagen: req.files?.imagen?.name || null
        };

        await ActualizarGrupo(id, body);
        res.json({ message: 'Grupo actualizado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

grupoMusicalCtl.eliminarGrupo = async (req, res) => {
    try {
        const id = req.params.id;
        await EliminarGrupo(id);
        res.json({ message: 'Grupo desactivado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = grupoMusicalCtl;
