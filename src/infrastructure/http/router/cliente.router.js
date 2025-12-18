const express = require('express');
const router = express.Router();
const authorize = require('../../../application/use-cases/auth/authorize');
const { 
    mostrarClientes, 
    crearCliente, 
    actualizarCliente, 
    eliminarCliente 
} = require('../controller/cliente.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

router.get('/lista', isLoggedIn, authorize(['Administrador']), mostrarClientes);
router.post('/crear', isLoggedIn, authorize(['Administrador']), crearCliente);
router.put('/actualizar/:id', isLoggedIn, authorize(['Administrador']), actualizarCliente);
router.delete('/eliminar/:id', isLoggedIn, authorize(['Administrador']), eliminarCliente);
module.exports = router;
