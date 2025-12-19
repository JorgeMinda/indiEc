const ropaService = require('../../../domain/services/ropa/ropa.service.js');   

module.exports = async () => {
    return await ropaService.obtenerRopa();
};
