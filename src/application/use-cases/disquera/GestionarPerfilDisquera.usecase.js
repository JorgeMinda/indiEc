const disqueraService = require('../../../domain/services/disquera/disquera.service.js');

const gestionarPerfilDisqueraUseCase = async (data) => {
    try {
        await disqueraService.gestionarPerfilSql(data);
        await disqueraService.gestionarPerfilMongo(data);
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = gestionarPerfilDisqueraUseCase;