const express = require("express");
const router = express.Router();
const { 
    obtenerAlbumes, 
    crearAlbum 
} = require('../controller/album.controller');
const isLoggedIn = require('../../lib/auth');

// Rutas protegidas
router.get('/lista', isLoggedIn, obtenerAlbumes);
router.post('/crear', isLoggedIn, crearAlbum);

module.exports = router;
