// src/domain/models/rol/rol.entity.js
class Rol {
    constructor({ id, nombre, permisos = [] }) {
      this.id = id;
      this.nombre = nombre;
      this.permisos = permisos;
    }
  
    tienePermiso(permiso) {
      return this.permisos.includes(permiso);
    }
  }
  
  module.exports = Rol;