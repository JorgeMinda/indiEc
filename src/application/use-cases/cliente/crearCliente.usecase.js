const clienteService = require('../../../domain/services/cliente/cliente.service.js');

module.exports = async (data) => {

    if (!data.cedulaCliente || !data.nombreCliente || !data.usernameCliente || !data.passwordCliente) {
        throw new Error('Datos básicos del cliente son obligatorios');
    }

    const nuevoCliente = await clienteService.crearClienteSql(data);

    if (data.direccionCliente || data.telefonoCliente || data.emailCliente) {
        await clienteService.crearClienteMongoSql(nuevoCliente.idClientes, data);
    }

    return nuevoCliente;
};
