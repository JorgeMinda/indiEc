const artista = (sequelize, type) => {
    return sequelize.define('artistas', {
        idArtista: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: type.STRING,
        apellido: type.STRING,
        correo: type.STRING,
        genero: type.STRING(100),
        ciudad: type.STRING(100),
        biografia: type.TEXT,
        estado: type.STRING,
        createArtista: type.STRING,
        updateArtista: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Artistas'
    })
}

module.exports = artista;