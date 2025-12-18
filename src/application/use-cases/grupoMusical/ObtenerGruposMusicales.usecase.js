const grupoService = require('../../../domain/services/grupoMusical/grupoMusical.service.js');

const obtenerGruposMusicalesUseCase = async () => {
    try {
        return await grupoService.obtenerGruposSql();
        await grupoService.obtenerGruposMongo(); // TODO: Implementar cuando se implemente el servicio de MongoDB
    } catch (error) {
        throw new Error(error.message);
    }
};