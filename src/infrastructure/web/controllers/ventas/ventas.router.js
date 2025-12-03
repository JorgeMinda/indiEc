const { Router } = require('express');
const router = Router();
const ventasCtl = require('./ventas.controller');

router.post('/', ventasCtl.registrarVenta);
router.get('/reporte', ventasCtl.obtenerReporte);

module.exports = router;
