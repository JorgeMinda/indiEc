// src/core/domain/entities/Evento.js
class Evento {
    constructor({ id = null, nombreEvento, ubicacion, fecha, generoMusical, contacto = null, capacidad = null, descripcion = null, imagen = null, estado = 'activo' }) {
      this.id = id; this.nombreEvento = nombreEvento; this.ubicacion = ubicacion; this.fecha = fecha;
      this.generoMusical = generoMusical; this.contacto = contacto; this.capacidad = capacidad;
      this.descripcion = descripcion; this.imagen = imagen; this.estado = estado;
    }
    estaActivo() { return this.estado === 'activo'; }
  }
  module.exports = Evento;