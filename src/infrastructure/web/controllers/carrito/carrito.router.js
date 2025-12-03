const { Router } = require('express');
const router = Router();
const carritoCtl = require('./carrito.controller');

router.post('/agregar', carritoCtl.agregar);
router.get('/', carritoCtl.obtener);
router.delete('/vaciar', carritoCtl.vaciar);

module.exports = router;