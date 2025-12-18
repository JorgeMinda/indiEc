const disqueraService = require('../../../domain/services/disquera/disquera.service.js');

const obtenerPerfilDisqueraUseCase = async () => {
    try {
        return await disqueraService.obtenerPerfilCompleto();   
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = obtenerPerfilDisqueraUseCase;
