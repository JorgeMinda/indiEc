const express = require("express");
const router = express.Router();
const { 
    obtenerAlbumes
    // crearAlbum // TODO: Descomentar cuando se cree el use case
} = require('../controller/album.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

// Rutas protegidas
router.get('/lista', isLoggedIn, obtenerAlbumes);
// TODO: Descomentar cuando se cree el use case
// router.post('/crear', isLoggedIn, crearAlbum);

module.exports = router;
