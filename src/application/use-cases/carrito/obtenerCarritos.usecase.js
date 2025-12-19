const carritoService = require('../../../domain/services/carrito/carrito.service.js');

module.exports = async () => {
    return await carritoService.obtenerActivos();
};
