// src/core/domain/entities/Carrito.js
class Carrito {
    constructor({ id = null, clienteId, items = [], estado = 'activo' }) {
      this.id = id;
      this.clienteId = clienteId;
      this.items = items; // [{ productoId, tipoProducto, nombre, precio, cantidad }]
      this.estado = estado;
    }
  
    agregarItem(nuevoItem) {
      const existente = this.items.find(
        i => i.productoId === nuevoItem.productoId && i.tipoProducto === nuevoItem.tipoProducto
      );
  
      if (existente) {
        existente.cantidad += nuevoItem.cantidad;
      } else {
        this.items.push({ ...nuevoItem });
      }
    }
  
    removerItem(productoId, tipoProducto) {
      this.items = this.items.filter(
        i => !(i.productoId === productoId && i.tipoProducto === tipoProducto)
      );
    }
  
    calcularTotal() {
      return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }
  
    estaVacio() {
      return this.items.length === 0;
    }
  
    vaciar() {
      this.items = [];
    }
  
    estaActivo() {
      return this.estado === 'activo';
    }
  
    desactivar() {
      this.estado = 'inactivo';
    }
  }
  
  module.exports = Carrito;