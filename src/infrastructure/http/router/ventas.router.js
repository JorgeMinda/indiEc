const express = require("express");
const router = express.Router();
const { 
    registrarVenta, 
    obtenerReporteVentas 
} = require('../controller/ventas.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.post('/registrar', isLoggedIn, registrarVenta);
router.get('/reporte', isLoggedIn, obtenerReporteVentas);

module.exports = router;
