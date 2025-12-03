// src/core/application/use-cases/ObtenerCarrito.js
class ObtenerCarrito {
    constructor({ carritoRepository }) {
      this.carritoRepository = carritoRepository;
    }
  
    async ejecutar(clienteId) {
      const carrito = await this.carritoRepository.buscarPorClienteId(clienteId);
      
      if (!carrito || !carrito.estaActivo()) {
        return { items: [], total: 0 };
      }
  
      return {
        carritoId: carrito.id,
        items: carrito.items,
        total: carrito.calcularTotal()
      };
    }
  }
  
  module.exports = ObtenerCarrito;