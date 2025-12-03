// src/infrastructure/web/controllers/carrito.controller.js → VERSIÓN FINAL Y FUNCIONAL
const orm = require('../../../Database/dataBase.orm');

const carritoCtl = {};

carritoCtl.agregar = async (req, res) => {
  try {
    const clienteId = req.user?.idClientes || req.body.clienteId;
    if (!clienteId) throw new Error('Cliente no identificado');

    let carrito = await orm.carrito.findOne({ where: { clienteId, estado: 'activo' } });

    if (!carrito) {
      carrito = await orm.carrito.create({
        clienteId,
        items: '[]',
        estado: 'activo',
        createCarrito: new Date().toLocaleString()
      });
    }

    let items = JSON.parse(carrito.items);
    const { productoId, tipoProducto, nombre, precio, cantidad = 1 } = req.body;

    const existente = items.find(i => i.productoId === productoId && i.tipoProducto === tipoProducto);
    if (existente) {
      existente.cantidad += parseInt(cantidad);
    } else {
      items.push({ productoId, tipoProducto, nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad) });
    }

    carrito.items = JSON.stringify(items);
    await carrito.save();

    const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    res.api({ carritoId: carrito.idCarrito, items, total }, 200, 'Producto agregado al carrito');
  } catch (err) {
    res.error(err.message, 400);
  }
};

carritoCtl.obtener = async (req, res) => {
  try {
    const clienteId = req.user?.idClientes;
    const carrito = await orm.carrito.findOne({ where: { clienteId, estado: 'activo' } });
    
    if (!carrito) return res.api({ items: [], total: 0 });

    const items = JSON.parse(carrito.items);
    const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    res.api({ carritoId: carrito.idCarrito, items, total });
  } catch (err) {
    res.error(err.message, 400);
  }
};

carritoCtl.vaciar = async (req, res) => {
  try {
    const clienteId = req.user?.idClientes;
    await orm.carrito.update({ items: '[]' }, { where: { clienteId, estado: 'activo' } });
    res.api(null, 200, 'Carrito vaciado');
  } catch (err) {
    res.error(err.message, 400);
  }
};

module.exports = carritoCtl;