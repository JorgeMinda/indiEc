const { Router } = require('express');
const router = Router();
const orm = require('../../../Database/dataBase.orm');
const isLoggedIn = require('../middlewares/lib/auth');

router.get('/generos', isLoggedIn, async (req, res) => {
  const generos = await orm.genero.findAll({ where: { estado: 'activo' } });
  res.api(generos);
});

router.post('/generos', isLoggedIn, async (req, res) => {
  await orm.genero.create({ ...req.body, estado: 'activo' });
  res.api(null, 'Género creado');
});

router.get('/tallas', isLoggedIn, async (req, res) => {
  const tallas = await orm.talla.findAll({ where: { estado: 'activo' } });
  res.api(tallas);
});

router.post('/inicializar', isLoggedIn, async (req, res) => {
  // Aquí tu lógica de inicializar datos básicos (puedes dejarla o moverla a un use-case después)
  res.api(null, 'Datos inicializados');
});

module.exports = router;