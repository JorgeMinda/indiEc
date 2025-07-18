const express = require("express");
const router = express.Router();
const { 
    obtenerEventos, 
    crearEvento 
} = require('../controller/evento.controller');
const isLoggedIn = require('../lib/auth');

router.get('/lista', isLoggedIn, obtenerEventos);
router.post('/crear', isLoggedIn, crearEvento);

module.exports = router;