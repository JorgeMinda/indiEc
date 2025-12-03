// src/infrastructure/web/controllers/ropa.controller.js
const orm = require('../../../Database/dataBase.orm');
const ropaCtl = {};
ropaCtl.crearRopa = async (req, res) => {
  try {
    await orm.ropa.create({ ...req.body, estado: 'activo', createRopa: new Date().toLocaleString() });
    res.apiResponse(null, 201, 'Ropa creada');
  } catch (err) { res.apiError(err.message, 400); }
};
module.exports = ropaCtl; // Exportar controladores