    const ObtenerEventos = require('../../../application/use-cases/evento/ObtenerEventos.usecase.js');
const CrearEvento = require('../../../application/use-cases/evento/CrearEvento.usecase.js');

const eventoCtl = {};

eventoCtl.obtenerEventos = async (req, res) => {
    try {
        const eventos = await ObtenerEventos();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

eventoCtl.crearEvento = async (req, res) => {
    try {
        const data = {
            ...req.body,
            imagen: req.files?.imagen?.name || null
        };

        await CrearEvento(data);
        res.json({ message: 'Evento creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = eventoCtl;
