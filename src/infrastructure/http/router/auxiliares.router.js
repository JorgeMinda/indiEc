const express = require("express");
const router = express.Router();
const {
    obtenerGeneros,
    crearGenero,
    // obtenerTallas, // TODO: Descomentar cuando se cree el use case
    inicializarDatos
} = require('../controller/auxiliares.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

// Rutas para géneros
router.get('/generos', isLoggedIn, obtenerGeneros);
router.post('/generos', isLoggedIn, crearGenero);



// TODO: Descomentar cuando se cree el use case obtenerTallas
// Rutas para tallas
// router.get('/tallas', isLoggedIn, obtenerTallas);



// Ruta para inicializar datos básicos
router.post('/inicializar', isLoggedIn, inicializarDatos);

module.exports = router;