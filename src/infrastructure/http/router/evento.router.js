const express = require("express");
const router = express.Router();
const { 
    obtenerEventos, 
    crearEvento, 
    actualizarEvento,
    eliminarEvento 
} = require('../controller/evento.controller');
//const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.get('/lista',  obtenerEventos);
router.post('/crear',  crearEvento);
router.put('/actualizar/:id',  actualizarEvento);
router.delete('/eliminar/:id',  eliminarEvento);

module.exports = router;