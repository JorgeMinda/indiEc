const { Router } = require('express');
const router = Router();
const isLoggedIn = require('../middlewares/lib/auth');
const orm = require('../../../Database/dataBase.orm');

router.get('/perfil', isLoggedIn, async (req, res) => {
  const perfil = await orm.perfilDisquera.findOne();
  res.api(perfil || {});
});

router.post('/perfil', isLoggedIn, async (req, res) => {
  await orm.perfilDisquera.upsert(req.body);
  res.api(null, 'Perfil actualizado');
});

router.put('/perfil', isLoggedIn, async (req, res) => {
  await orm.perfilDisquera.upsert(req.body);
  res.api(null, 'Perfil actualizado');
});

router.get('/estadisticas', isLoggedIn, async (req, res) => {
  const stats = { /* tu lógica de estadísticas */ };
  res.api(stats);
});

module.exports = router;