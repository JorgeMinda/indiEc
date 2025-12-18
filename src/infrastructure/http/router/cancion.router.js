const express = require("express");
const router = express.Router();
const { 
    obtenerCanciones, 
    crearCancion, 
    obtenerCancionesPorArtista,
    actualizarCancion,
    eliminarCancion
} = require('../controller/cancion.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.get('/lista', isLoggedIn, obtenerCanciones);
router.get('/artista/:artistaId', isLoggedIn, obtenerCancionesPorArtista);
router.post('/crear', isLoggedIn, crearCancion);
router.put('/:id', isLoggedIn, actualizarCancion);
router.delete('/:id', isLoggedIn, eliminarCancion);

module.exports = router;