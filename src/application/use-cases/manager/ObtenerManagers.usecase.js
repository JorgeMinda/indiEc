const managerService = require('../../../domain/services/manager/manager.service.js');

const obtenerManagersUseCase = async () => {
    try {
        return await managerService.obtenerManagersSql();
        await managerService.obtenerManagersMongo(); // TODO: Implementar cuando se implemente el servicio de MongoDB
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = obtenerManagersUseCase;    