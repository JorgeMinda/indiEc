// src/domain/models/artista/artista.entity.js
class Artista {
    constructor({
      id,
      nombre,
      bio = '',
      genero,
      foto,
      activo = true,
      fechaCreacion = new Date()
    }) {
      this.id = id;
      this.nombre = nombre;
      this.bio = bio;
      this.genero = genero;
      this.foto = foto;
      this.activo = activo;
      this.fechaCreacion = fechaCreacion;
    }
  
    tieneNombreValido() {
      return this.nombre && this.nombre.trim().length >= 2;
    }
  
    estaActivo() {
      return this.activo;
    }
  }
  
  module.exports = Artista;