const mostrarPaginaUseCase = require('../../../application/use-cases/page/mostrarPagina.usecase');
const crearPaginaUseCase = require('../../../application/use-cases/page/crearPagina.usecase');

const pageCtl = {};

pageCtl.mostrarPagina = async (req, res) => {
    try {
        const data = await mostrarPaginaUseCase.execute();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

pageCtl.crearPagina = async (req, res) => {
    try {
        const data = await crearPaginaUseCase.execute(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = pageCtl;
