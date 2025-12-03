// src/core/domain/entities/Cancion.js
class Cancion {
    constructor({
      id = null,
      titulo,
      album,
      año,
      artistaId,
      albumeId,
      duracion = null,
      genero = null,
      imagen = null,
      estado = 'activo'
    }) {
      this.id = id;
      this.titulo = titulo;
      this.album = album;
      this.año = año;
      this.artistaId = artistaId;
      this.albumeId = albumeId;
      this.duracion = duracion;
      this.genero = genero;
      this.imagen = imagen;
      this.estado = estado;
    }
  
    estaActiva() {
      return this.estado === 'activo';
    }
  
    desactivar() {
      this.estado = 'inactivo';
    }
  }
  
  module.exports = Cancion;