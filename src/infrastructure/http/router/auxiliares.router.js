const express = require("express");
const router = express.Router();
const {
    obtenerGeneros,
    crearGenero,
    obtenerTallas,
    inicializarDatos
} = require('../controller/auxiliares.controller');
const isLoggedIn = require('../../lib/auth');

// Rutas para géneros
router.get('/generos', isLoggedIn, obtenerGeneros);
router.post('/generos', isLoggedIn, crearGenero);



// Rutas para tallas
router.get('/tallas', isLoggedIn, obtenerTallas);



// Ruta para inicializar datos básicos
router.post('/inicializar', isLoggedIn, inicializarDatos);

module.exports = router;