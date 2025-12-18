const rol = require('./rol');
const usuario = (sequelize, type) =>{
    return sequelize.define('users', {
        idUser: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rolId: {  // ← Añadir este campo si no existe
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 2, // Cliente por defecto
            references: {
                model: 'roles',
                key: 'idRol'
            }
        },
        nameUsers: type.STRING,
        phoneUser: type.STRING,
        emailUser: type.STRING,
        passwordUser: type.STRING,
        userName: type.STRING,
        stateUser: type.STRING,
        createUser: type.STRING,
        updateUser: type.STRING,
    }, {
        timestamps: false,
        Comment: 'Tabla de Usuarios'
    })
}

module.exports = usuario;