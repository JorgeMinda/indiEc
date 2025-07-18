const express = require("express");
const router = express.Router();
const { 
    obtenerCanciones, 
    crearCancion, 
    obtenerCancionesPorArtista 
} = require('../controller/cancion.controller');
const isLoggedIn = require('../lib/auth');

router.get('/lista', isLoggedIn, obtenerCanciones);
router.post('/crear', isLoggedIn, crearCancion);
router.get('/artista/:artistaId', isLoggedIn, obtenerCancionesPorArtista);

module.exports = router;