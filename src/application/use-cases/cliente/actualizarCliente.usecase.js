const clienteService = require('../../../domain/services/cliente/cliente.service.js');

module.exports = async (id, data) => {

    if (!data.cedulaCliente || !data.nombreCliente || !data.usernameCliente) {
        throw new Error('Datos básicos son obligatorios');
    }

    await clienteService.actualizarClienteSql(id, data);

    if (data.direccionCliente || data.telefonoCliente || data.emailCliente) {
        await clienteService.actualizarClienteMongoSql(id, data);
    }

    return true;
};
