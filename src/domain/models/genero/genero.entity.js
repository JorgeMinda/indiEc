// src/domain/models/genero/genero.entity.js
class Genero {
    constructor({ id, nombre, descripcion = '' }) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
  
    tieneNombreValido() {
      return this.nombre && this.nombre.trim().length > 0;
    }
  }
  
  module.exports = Genero;