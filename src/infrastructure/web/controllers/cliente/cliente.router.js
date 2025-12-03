const { Router } = require('express');
const router = Router();
const clienteCtl = require('./cliente.controller');

router.post('/registro', clienteCtl.registrar);
router.post('/login', clienteCtl.login);

module.exports = router;