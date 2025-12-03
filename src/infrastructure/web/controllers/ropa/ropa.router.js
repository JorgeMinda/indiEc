const { Router } = require('express');
const router = Router();
const ropaCtl = require('./ropa.controller');

router.post('/', ropaCtl.crearRopa);
// router.get('/', ropaCtl.obtenerTodos);

module.exports = router;