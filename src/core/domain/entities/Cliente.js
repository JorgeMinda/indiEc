// src/core/domain/entities/Cliente.js
class Cliente {
    constructor({
      id = null,
      cedula,
      nombre,
      username,
      password,      // ya encriptada
      direccion = null,
      telefono = null,
      email = null,
      tipo = 'Regular',
      estado = 'activo'
    }) {
      this.id = id;
      this.cedula = cedula;
      this.nombre = nombre;
      this.username = username;
      this.password = password;
      this.direccion = direccion;
      this.telefono = telefono;
      this.email = email;
      this.tipo = tipo;
      this.estado = estado;
    }
  
    estaActivo() {
      return this.estado === 'activo';
    }
  
    desactivar() {
      this.estado = 'inactivo';
    }
  
    coincidePassword(passwordPlana, encriptador) {
      return encriptador.descifrar(this.password).then(p => p === passwordPlana);
    }
  }
  
  module.exports = Cliente;