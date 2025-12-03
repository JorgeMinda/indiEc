// src/infrastructure/web/controllers/cliente.controller.js → VERSIÓN FINAL Y FUNCIONAL
const orm = require('../../../Database/dataBase.orm');
const mongo = require('../../../Database/dataBaseMongose');
const { cifrarDatos, descifrarDatos } = require('../middlewares/lib/encrypDates');

const clienteCtl = {};

clienteCtl.registrar = async (req, res) => {
  try {
    const { cedulaCliente, nombreCliente, usernameCliente, passwordCliente, direccionCliente, telefonoCliente, emailCliente, tipoCliente = 'Regular' } = req.body;

    // Crear en PostgreSQL
    const nuevoCliente = await orm.cliente.create({
      cedulaCliente: await cifrarDatos(cedulaCliente),
      nombreCliente: await cifrarDatos(nombreCliente),
      usernameCliente: await cifrarDatos(usernameCliente),
      passwordCliente: await cifrarDatos(passwordCliente),
      stadoCliente: 'activo',
      createCliente: new Date().toLocaleString()
    });

    // Crear en MongoDB
    await mongo.clienteModel.create({
      direccionCliente: direccionCliente ? await cifrarDatos(direccionCliente) : null,
      telefonoCliente: telefonoCliente ? await cifrarDatos(telefonoCliente) : null,
      emailCliente: emailCliente ? await cifrarDatos(emailCliente) : null,
      tipoCliente,
      idClienteSql: nuevoCliente.idClientes
    });

    res.api({ idCliente: nuevoCliente.idClientes }, 201, 'Cliente registrado exitosamente');
  } catch (err) {
    console.error('Error registrando cliente:', err);
    res.error(err.message || 'Error interno', 500);
  }
};

clienteCtl.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const cliente = await orm.cliente.findOne({
      where: { usernameCliente: await cifrarDatos(username) }
    });

    if (!cliente) throw new Error('Credenciales inválidas');

    const passCorrecta = await descifrarDatos(cliente.passwordCliente) === password;
    if (!passCorrecta) throw new Error('Credenciales inválidas');

    // Aquí puedes generar sesión o JWT
    req.login({ id: cliente.idClientes, username }, (err) => {
      if (err) throw err;
      res.api({ mensaje: 'Login exitoso', cliente: { id: cliente.idClientes, username } });
    });
  } catch (err) {
    res.error(err.message, 401);
  }
};

module.exports = clienteCtl;