const ropaService = require('../../../domain/services/ropa/ropa.service.js');

module.exports = async (id) => {
    return await ropaService.eliminarRopa(id);
};
