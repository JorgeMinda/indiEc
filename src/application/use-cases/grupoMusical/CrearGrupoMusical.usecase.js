const grupoService = require('../../../domain/services/grupoMusical/grupoMusical.service.js');

module.exports = async (data) => {
    try {
        await grupoService.crearGrupoSql(data);
        await grupoService.crearGrupoMongo(data); // TODO: Implementar cuando se implemente el servicio de MongoDB
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};
