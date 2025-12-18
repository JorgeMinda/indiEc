const carritoService = require('../../../domain/services/carrito/carrito.service.js');

module.exports = async (data) => {

    if (!data.producto || !data.tipoProducto || !data.cantidad) {
        throw new Error('Todos los campos son requeridos');
    }

    return await carritoService.crearCarritoSql(data);
};
