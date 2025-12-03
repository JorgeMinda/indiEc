// src/core/application/use-cases/LoginCliente.js
class LoginCliente {
    constructor({ clienteRepository, encriptador }) {
      this.clienteRepository = clienteRepository;
      this.encriptador = encriptador;
    }
  
    async ejecutar(usernamePlano, passwordPlana) {
      const usernameCifrado = await this.encriptador.cifrar(usernamePlano);
      const cliente = await this.clienteRepository.buscarPorUsername(usernameCifrado);
  
      if (!cliente || !cliente.estaActivo()) {
        throw new Error('Credenciales inválidas');
      }
  
      const coincide = await cliente.coincidePassword(
        await this.encriptador.cifrar(passwordPlana),
        this.encriptador
      );
  
      if (!coincide) {
        throw new Error('Credenciales inválidas');
      }
  
      return {
        id: cliente.id,
        nombre: await this.encriptador.descifrar(cliente.nombre),
        username: usernamePlano,
        tipo: cliente.tipo
      };
    }
  }
  
  module.exports = LoginCliente;