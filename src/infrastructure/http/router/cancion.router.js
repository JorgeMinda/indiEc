const express = require("express");
const router = express.Router();
const { 
    obtenerCanciones, 
    crearCancion, 
    obtenerCancionesPorArtista 
} = require('../controller/cancion.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.get('/lista', isLoggedIn, obtenerCanciones);
router.post('/crear', isLoggedIn, crearCancion);
router.get('/artista/:artistaId', isLoggedIn, obtenerCancionesPorArtista);

module.exports = router;