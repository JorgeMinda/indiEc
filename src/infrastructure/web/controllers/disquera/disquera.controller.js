// src/infrastructure/web/controllers/disquera/disquera.controller.js
const orm = require('../../../Database/dataBase.orm');

const disqueraCtl = {};

disqueraCtl.crear = async (req, res) => {
  try {
    const nuevaDisquera = await orm.disquera.create(req.body);
    res.api({ idDisquera: nuevaDisquera.idDisquera }, 'Disquera creada exitosamente', 201);
  } catch (error) {
    res.error(error.message, 400);
  }
};

disqueraCtl.listar = async (req, res) => {
  try {
    const disqueras = await orm.disquera.findAll({ where: { estado: 'activo' } });
    res.api(disqueras);
  } catch (error) {
    res.error(error.message, 500);
  }
};

module.exports = disqueraCtl;
