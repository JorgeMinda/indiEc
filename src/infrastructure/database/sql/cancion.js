const cancion = (sequelize, type) => {
    return sequelize.define('canciones', {
        idCancion: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idArtista: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'artistas',
                key: 'idArtista'
            }
        },
        titulo: type.STRING,
        album: type.STRING,
        año: type.INTEGER,
        streams: {
            type: type.INTEGER,
            defaultValue: 0
        },
        estado: {
            type: type.STRING,
            defaultValue: 'activo'
        },
        createCancion: type.STRING,
        updateCancion: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Canciones'
    })
}

module.exports = cancion;