const obtenerRopa = require('../../../application/use-cases/ropa/ObtenerRopa.usecase.js');
const crearRopa = require('../../../application/use-cases/ropa/CrearRopa.usecase.js');
const actualizarRopa = require('../../../application/use-cases/ropa/ActualizarRopa.usecase.js');
const eliminarRopa = require('../../../application/use-cases/ropa/EliminarRopa.usecase.js');

const ropaCtl = {};

ropaCtl.mostrarRopa = async (req, res) => {
    try {
        const data = await obtenerRopa();
        return res.apiResponse(data, 200, 'Ropa obtenida correctamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

ropaCtl.crearRopa = async (req, res) => {
    try {
        const data = await crearRopa(req.body);
        return res.apiResponse(data, 201, 'Ropa creada exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

ropaCtl.actualizarRopa = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await actualizarRopa(id, req.body);
        return res.apiResponse(data, 200, 'Ropa actualizada exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

ropaCtl.eliminarRopa = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await eliminarRopa(id);
        return res.apiResponse(data, 200, 'Ropa eliminada exitosamente');
    } catch (error) {
        return res.apiError(error.message, 500);
    }
};

module.exports = ropaCtl;
