const managerService = require('../../../domain/services/manager/manager.service.js');

const actualizarManagerUseCase = async (id, data) => {  
    try {
        await managerService.actualizarManagerSql(id, data);
        await managerService.actualizarManagerMongo(id, data); // TODO: Implementar cuando se implemente el servicio de MongoDB
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = actualizarManagerUseCase;  