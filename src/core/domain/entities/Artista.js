class Artista {
    constructor({
      id = null,
      nombre,
      apellido,
      correo,        // ya encriptado
      telefono,      // ya encriptado o null
      direccion,
      fotoPerfil = null,
      estado = 'activo'
    }) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.telefono = telefono;
      this.direccion = direccion;
      this.fotoPerfil = fotoPerfil;
      this.estado = estado;
    }
  
    estaActivo() {
      return this.estado === 'activo';
    }
  
    desactivar() {
      this.estado = 'inactivo';
    }
  
    nombreCompleto() {
      return `${this.nombre} ${this.apellido}`.trim();
    }
  }
  
  module.exports = Artista;