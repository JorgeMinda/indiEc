const express = require("express");
const router = express.Router();
const { 
    obtenerPerfil, 
    gestionarPerfil
    // obtenerEstadisticas // TODO: Implementar cuando esté disponible
} = require('../controller/disquera.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.get('/perfil', isLoggedIn, obtenerPerfil);
router.post('/perfil', isLoggedIn, gestionarPerfil);
router.put('/perfil', isLoggedIn, gestionarPerfil);
// TODO: Descomentar cuando se implemente obtenerEstadisticas
// router.get('/estadisticas', isLoggedIn, obtenerEstadisticas);

module.exports = router;