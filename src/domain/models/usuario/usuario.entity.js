// src/domain/models/usuario/usuario.entity.js
class Usuario {
    constructor({
      id,
      nombre,
      email,
      passwordHash,
      rolId,
      activo = true
    }) {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.passwordHash = passwordHash;
      this.rolId = rolId;
      this.activo = activo;
    }
  
    estaActivo() {
      return this.activo;
    }
  }
  
  module.exports = Usuario;