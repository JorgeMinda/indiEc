// src/domain/models/evento/evento.entity.js
class Evento {
    constructor({
      id,
      titulo,
      descripcion,
      fecha,
      lugar,
      artistas = [],
      precioEntrada = 0,
      imagen,
      activo = true
    }) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fecha = fecha;
      this.lugar = lugar;
      this.artistas = artistas;
      this.precioEntrada = precioEntrada;
      this.imagen = imagen;
      this.activo = activo;
    }
  
    tieneArtistas() {
      return this.artistas.length > 0;
    }
  }
  
  module.exports = Evento;