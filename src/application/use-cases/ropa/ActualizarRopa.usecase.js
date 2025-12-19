const ropaService = require('../../../domain/services/ropa/ropa.service.js');

module.exports = async (id, data) => {
    return await ropaService.actualizarRopa(id, data);
};
