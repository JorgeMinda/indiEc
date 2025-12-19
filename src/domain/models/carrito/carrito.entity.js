// src/domain/models/carrito/carrito.entity.js
class Carrito {
    constructor({ id, clienteId, items = [], total = 0, fechaCreacion = new Date() }) {
      this.id = id;
      this.clienteId = clienteId;
      this.items = items; // [{ productoId, tipo: 'album'|'ropa', cantidad, precio }]
      this.total = total;
      this.fechaCreacion = fechaCreacion;
    }
  
    agregarItem(item) {
      this.items.push(item);
      this.total += item.precio * item.cantidad;
    }
  
    estaVacio() {
      return this.items.length === 0;
    }
  }
  
  module.exports = Carrito;