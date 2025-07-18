const express = require('express');
const router = express.Router();

const { 
    mostrarRopa, 
    crearRopa,
    actualizarRopa,
    eliminarRopa 
} = require('../controller/ropa.controller');
const isLoggedIn = require('../lib/auth');

// Obtener todas las prendas de ropa
router.get('/lista', isLoggedIn, mostrarRopa);

// Crear nueva prenda de ropa
router.post('/crear', isLoggedIn, crearRopa);

// Actualizar una prenda existente
router.put('/actualizar/:id', isLoggedIn, actualizarRopa);

// Eliminar (desactivar) una prenda
router.delete('/eliminar/:id', isLoggedIn, eliminarRopa);

module.exports = router;
