const express = require('express');
const router = express.Router();

const { 
    mostrarManagers, 
    crearManager, 
    actualizarManager, 
    eliminarManager 
} = require('../controller/manager.controller');
const isLoggedIn = require('../lib/auth');

// Obtener todos los managers
router.get('/lista', isLoggedIn, mostrarManagers);

// Crear nuevo manager
router.post('/crear', isLoggedIn, crearManager);

// Actualizar un manager existente
router.put('/actualizar/:id', isLoggedIn, actualizarManager);

// Eliminar (desactivar) un manager
router.delete('/eliminar/:id', isLoggedIn, eliminarManager);

module.exports = router;
