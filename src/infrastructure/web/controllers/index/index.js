const { Router } = require('express');
const router = Router();

// Controlador principal (puedes moverlo a infrastructure más adelante si quieres)
const indexCtl = {
  mostrarMensaje: (req, res) => {
    res.json({
      message: '¡Bienvenido a IndieC Backend!',
      version: '2.0',
      status: 'hexagonal & ready',
      author: 'Jair',
      uptime: process.uptime().toFixed(2) + 's'
    });
  }
};

router.get('/', indexCtl.mostrarMensaje);

module.exports = router;