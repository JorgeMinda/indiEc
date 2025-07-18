const express = require("express");
const router = express.Router();
const { 
    registrarVenta, 
    obtenerReporteVentas 
} = require('../controller/ventas.controller');
const isLoggedIn = require('../lib/auth');

router.post('/registrar', isLoggedIn, registrarVenta);
router.get('/reporte', isLoggedIn, obtenerReporteVentas);

module.exports = router;
