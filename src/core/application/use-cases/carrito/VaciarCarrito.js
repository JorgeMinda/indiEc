// src/core/application/use-cases/VaciarCarrito.js
class VaciarCarrito {
    constructor({ carritoRepository }) {
      this.carritoRepository = carritoRepository;
    }
  
    async ejecutar(clienteId) {
      const carrito = await this.carritoRepository.buscarPorClienteId(clienteId);
      if (carrito && carrito.estaActivo()) {
        carrito.vaciar();
        await this.carritoRepository.actualizar(carrito);
      }
      return { mensaje: 'Carrito vaciado' };
    }
  }
  
  module.exports = VaciarCarrito;