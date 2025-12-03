// src/core/application/use-cases/carrito/AgregarAlCarrito.js
const Carrito = require('../../../domain/entities/Carrito');

class AgregarAlCarrito {
  constructor({ carritoRepository }) {
    this.carritoRepository = carritoRepository;
  }

  async ejecutar({ clienteId, productoId, tipoProducto, nombre, precio, cantidad = 1 }) {
    let carrito = await this.carritoRepository.buscarPorClienteId(clienteId);

    if (!carrito || !carrito.estaActivo()) {
      carrito = new Carrito({ clienteId });
    }

    carrito.agregarItem({
      productoId,
      tipoProducto,
      nombre,
      precio: Number(precio),
      cantidad: Number(cantidad)
    });

    await this.carritoRepository.guardar(carrito);
    return {
      carritoId: carrito.id,
      total: carrito.calcularTotal(),
      items: carrito.items.length
    };
  }
}

module.exports = AgregarAlCarrito;