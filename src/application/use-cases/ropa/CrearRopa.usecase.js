const ropaService = require('../../../domain/services/ropa/ropa.service.js');

module.exports = async (data) => {
    return await ropaService.crearRopa(data);
};
