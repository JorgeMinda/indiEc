const express = require("express");
const router = express.Router();
const { 
    obtenerArtistas, 
    crearArtista, 
    obtenerArtistaPorId, 
    actualizarArtista, 
    eliminarArtista,
    subirFoto
} = require('../controller/artista.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.get('/lista', isLoggedIn, obtenerArtistas);
router.post('/crear', isLoggedIn, crearArtista);
router.get('/:id', isLoggedIn, obtenerArtistaPorId);
router.put('/:id', isLoggedIn, actualizarArtista);
router.delete('/:id', isLoggedIn, eliminarArtista);
router.post('/:id/photo', isLoggedIn, subirFoto); // NUEVO

module.exports = router;