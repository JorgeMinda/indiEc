// src/infrastructure/web/controllers/ventas.controller.js
const orm = require('../../../Database/dataBase.orm');
const ventasCtl = {};
// Inicializar controladores
ventasCtl.registrarVenta = async (req, res) => {
  try {
    await orm.registroVentas.create({
      ...req.body, fecha: new Date(), estado: 'activo', createVenta: new Date().toLocaleString()
    });
    res.apiResponse(null, 201, 'Venta registrada');
  } catch (err) { res.apiError(err.message, 400); }
};

ventasCtl.obtenerReporte = async (req, res) => {
  try {
    const ventas = await orm.registroVentas.findAll({ where: { estado: 'activo' } });
    res.apiResponse({ ventas }, 200, 'Reporte obtenido');
  } catch (err) { res.apiError(err.message, 400); }
};

module.exports = ventasCtl; // Exportar controladores (si es necesario)