const clienteService = require('../../../domain/services/cliente/cliente.service.js');

module.exports = async (id) => {
    try {   
        await clienteService.eliminarClienteSql(id);   
        await clienteService.eliminarClienteMongo(id);     
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};
