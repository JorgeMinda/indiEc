const express = require('express');
const router = express.Router();

const { 
    mostrarManagers, 
    crearManager, 
    actualizarManager
    // eliminarManager // TODO: Descomentar cuando se cree el use case
} = require('../controller/manager.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');
// Obtener todos los managers
router.get('/lista', isLoggedIn, mostrarManagers);

// Crear nuevo manager
router.post('/crear', isLoggedIn, crearManager);

// Actualizar un manager existente
router.put('/actualizar/:id', isLoggedIn, actualizarManager);

// TODO: Descomentar cuando se cree el use case EliminarManager
// Eliminar (desactivar) un manager
// router.delete('/eliminar/:id', isLoggedIn, eliminarManager);

module.exports = router;
