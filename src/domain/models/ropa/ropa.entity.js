class Ropa {
    constructor({
        idRopa,
        nombre,
        artista,
        tipo,
        talla,
        estado,
        createRopa,
        updateRopa
    }) {
        this.idRopa = idRopa;
        this.nombre = nombre;
        this.artista = artista;
        this.tipo = tipo;
        this.talla = talla;
        this.estado = estado;
        this.createRopa = createRopa;
        this.updateRopa = updateRopa;
    }
}

module.exports = Ropa;