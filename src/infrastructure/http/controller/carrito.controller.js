const obtenerCarritos = require('../../../application/use-cases/carrito/obtenerCarritos.usecase');
const crearCarrito = require('../../../application/use-cases/carrito/crearCarrito.usecase');
const actualizarCarrito = require('../../../application/use-cases/carrito/actualizarCarrito.usecase');
const eliminarCarrito = require('../../../application/use-cases/carrito/eliminarCarrito.usecase');

const carritoCtl = {};

carritoCtl.mostrarCarritos = async (req, res) => {
    try {
        const data = await obtenerCarritos();
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

carritoCtl.crearCarrito = async (req, res) => {
    try {
        const nuevo = await crearCarrito(req.body);
        res.status(201).json({ message: 'Éxito al guardar', idCarrito: nuevo.idCarrito });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

carritoCtl.actualizarCarrito = async (req, res) => {
    try {
        await actualizarCarrito(req.params.id, req.body);
        res.json({ message: 'Carrito actualizado' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

carritoCtl.eliminarCarrito = async (req, res) => {
    try {
        await eliminarCarrito(req.params.id);
        res.json({ message: 'Carrito eliminado' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

module.exports = carritoCtl;
