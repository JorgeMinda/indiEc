const carritoService = require('../../../domain/services/carrito/carrito.service.js');

module.exports = async (id) => {
    const result = await carritoService.eliminarCarritoSql(id);

    return result;
};
