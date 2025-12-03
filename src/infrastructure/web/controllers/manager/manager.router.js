const { Router } = require('express');
const router = Router();
const orm = require('../../../Database/dataBase.orm');
const isLoggedIn = require('../middlewares/lib/auth');

router.get('/lista', isLoggedIn, async (req, res) => {
  const managers = await orm.manager.findAll({ where: { estado: 'activo' } });
  res.api(managers);
});

router.post('/crear', isLoggedIn, async (req, res) => {
  const manager = await orm.manager.create({ ...req.body, estado: 'activo' });
  res.api({ idManager: manager.idManager });
});

router.put('/actualizar/:id', isLoggedIn, async (req, res) => {
  await orm.manager.update(req.body, { where: { idManager: req.params.id } });
  res.api(null, 'Manager actualizado');
});

router.delete('/eliminar/:id', isLoggedIn, async (req, res) => {
  await orm.manager.update({ estado: 'inactivo' }, { where: { idManager: req.params.id } });
  res.api(null, 'Manager eliminado');
});

module.exports = router;