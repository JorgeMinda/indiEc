const { cifrarDatos, descifrarDatos } = require('../../lib/encrypDates');
const Encriptador = require('../../core/ports/services/Encriptador');

class NodeEncriptador extends Encriptador {
  async cifrar(texto) {
    return cifrarDatos(texto);
  }
  async descifrar(textoCifrado) {
    return descifrarDatos(textoCifrado);
  }
}

module.exports = NodeEncriptador;