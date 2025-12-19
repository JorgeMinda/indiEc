const managerService = require('../../../domain/services/manager/manager.service.js');

const crearManagerUseCase = async (data) => {
    try {
        await managerService.crearManagerSql(data);
        await managerService.crearManagerMongo(data); // TODO: Implementar cuando se implemente el servicio de MongoDB
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = crearManagerUseCase;   