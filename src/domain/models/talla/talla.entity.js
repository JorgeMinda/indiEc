// src/domain/models/talla/talla.entity.js
class Talla {
    constructor({ id, nombre, abreviatura }) {
      this.id = id;
      this.nombre = nombre; // ej: "Mediana"
      this.abreviatura = abreviatura; // ej: "M"
    }
  }
  
  module.exports = Talla;