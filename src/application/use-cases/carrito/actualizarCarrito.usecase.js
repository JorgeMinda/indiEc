const carritoService = require('../../../domain/services/carrito/carrito.service.js');

module.exports = async (id, data) => {

    if (!data.producto || !data.tipoProducto || !data.cantidad) {
        throw new Error('Todos los campos son requeridos');
    }

    const result = await carritoService.actualizarCarritoSql(id, data);

    return result;
};
