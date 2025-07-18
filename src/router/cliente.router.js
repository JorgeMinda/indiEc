const express = require('express');
const router = express.Router();

const { 
    mostrarClientes, 
    crearCliente, 
    actualizarCliente, 
    eliminarCliente 
} = require('../controller/cliente.controller');
const isLoggedIn = require('../lib/auth');

// Obtener todos los clientes
router.get('/lista', isLoggedIn, mostrarClientes);

// Crear nuevo cliente
router.post('/crear', isLoggedIn, crearCliente);

// Actualizar un cliente existente
router.put('/actualizar/:id', isLoggedIn, actualizarCliente);

// Eliminar (desactivar) un cliente
router.delete('/eliminar/:id', isLoggedIn, eliminarCliente);

module.exports = router;
