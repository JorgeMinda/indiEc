const express = require("express");
const router = express.Router();
const { 
    obtenerPerfilDisquera, 
    gestionarPerfilDisquera, 
    obtenerEstadisticas 
} = require('../controller/disquera.controller');
const isLoggedIn = require('../lib/auth');

router.get('/perfil', isLoggedIn, obtenerPerfilDisquera);
router.post('/perfil', isLoggedIn, gestionarPerfilDisquera);
router.put('/perfil', isLoggedIn, gestionarPerfilDisquera);
router.get('/estadisticas', isLoggedIn, obtenerEstadisticas);

module.exports = router;