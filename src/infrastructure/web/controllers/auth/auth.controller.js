// src/infrastructure/web/controllers/auth/auth.controller.js
const orm = require('../../../Database/dataBase.orm');
const { cifrarDatos, descifrarDatos } = require('../middlewares/lib/encrypDates');

const authCtl = {};

authCtl.registrar = async (req, res) => {
  try {
    const { nameUsers, emailUser, userName, passwordUser, phoneUser } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await orm.usuario.findOne({
      where: { userName: userName }
    });

    if (usuarioExistente) {
      return res.error('El nombre de usuario ya existe', 400);
    }

    // Crear nuevo usuario
    const nuevoUsuario = await orm.usuario.create({
      nameUsers,
      emailUser,
      userName,
      passwordUser, // En producción, usar bcrypt
      phoneUser: phoneUser || null,
      stateUser: 'active',
      createUser: new Date().toLocaleString()
    });

    res.api({ idUser: nuevoUsuario.idUser, userName: nuevoUsuario.userName }, 201, 'Usuario registrado exitosamente');
  } catch (err) {
    console.error('Error registrando usuario:', err);
    res.error(err.message || 'Error interno', 500);
  }
};

authCtl.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await orm.usuario.findOne({
      where: { userName: username }
    });

    if (!usuario) {
      return res.error('Credenciales inválidas', 401);
    }

    // Comparar contraseña (en producción, usar bcrypt)
    if (password !== usuario.passwordUser) {
      return res.error('Credenciales inválidas', 401);
    }

    // Iniciar sesión con Passport
    req.login({ id: usuario.idUser, userName: usuario.userName }, (err) => {
      if (err) {
        return res.error('Error al iniciar sesión', 500);
      }
      res.api({ mensaje: 'Login exitoso', usuario: { id: usuario.idUser, userName: usuario.userName } });
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.error(err.message || 'Error interno', 500);
  }
};

module.exports = authCtl;
