// src/core/domain/entities/Ropa.js
class Ropa {
    constructor({ id = null, nombre, artista, tipo, talla, estado = 'activo' }) {
      this.id = id; this.nombre = nombre; this.artista = artista; this.tipo = tipo;
      this.talla = talla; this.estado = estado;
    }
  }
  module.exports = Ropa;