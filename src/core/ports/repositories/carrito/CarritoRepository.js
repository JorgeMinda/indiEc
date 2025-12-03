// src/core/ports/repositories/CarritoRepository.js
class CarritoRepository {
    async guardar(carrito) { throw new Error('guardar() no implementado'); }
    async buscarPorClienteId(clienteId) { throw new Error('buscarPorClienteId() no implementado'); }
    async actualizar(carrito) { throw new Error('actualizar() no implementado'); }
  }
  
  module.exports = CarritoRepository;