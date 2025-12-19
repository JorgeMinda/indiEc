// src/domain/models/cliente/cliente.entity.js
class Cliente {
    constructor({
      id,
      nombre,
      email,
      passwordHash,
      rol = 'cliente',
      carritoId,
      activo = true
    }) {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.passwordHash = passwordHash;
      this.rol = rol;
      this.carritoId = carritoId;
      this.activo = activo;
    }
  
    esAdmin() {
      return this.rol === 'admin';
    }
  
    esDisquera() {
      return this.rol === 'disquera';
    }
  }
  
  module.exports = Cliente;