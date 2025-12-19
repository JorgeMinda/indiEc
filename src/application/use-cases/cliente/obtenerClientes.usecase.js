const clienteService = require('../../../domain/services/cliente/cliente.service.js');

module.exports = async () => {
    return await clienteService.obtenerActivosSql();
};
