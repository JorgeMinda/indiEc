
const orm = require('../../../infrastructure/database/connection/dataBase.orm');
class AuxiliaresService {

    // Obtener géneros
    async obtenerGeneros() {
        try {
            const generos = await orm.genero.findAll({
                where: { estado: "activo" },
                order: [["nombreGenero", "ASC"]],
            });

            return { error: false, status: 200, data: generos, message: "Géneros obtenidos exitosamente" };
        } catch (error) {
            console.error("Error al obtener géneros:", error);
            return { error: true, status: 500, message: "Error interno del servidor" };
        }
    }

    // Crear género
    async crearGenero(body) {
        try {
            const { nombreGenero, descripcion } = body;

            const nuevoGenero = await orm.genero.create({
                nombreGenero,
                descripcion,
                estado: "activo",
            });

            return { error: false, status: 201, data: nuevoGenero, message: "Género creado exitosamente" };

        } catch (error) {
            console.error("Error al crear género:", error);
            return { error: true, status: 500, message: "Error al crear el género" };
        }
    }

    // Obtener tallas
    async obtenerTallas() {
        try {
            const tallas = await orm.talla.findAll({
                where: { estado: "activo" },
                order: [["nombreTalla", "ASC"]],
            });

            return { error: false, status: 200, data: tallas, message: "Tallas obtenidas exitosamente" };
        } catch (error) {
            console.error("Error al obtener tallas:", error);
            return { error: true, status: 500, message: "Error interno del servidor" };
        }
    }

    // Inicializar datos básicos
    async inicializarDatos() {
        try {
            // Géneros básicos
            const generosBasicos = [
                { nombreGenero: "Pop", descripcion: "Música popular", estado: "activo" },
                { nombreGenero: "Rock", descripcion: "Música rock", estado: "activo" },
                { nombreGenero: "Reggaeton", descripcion: "Música urbana", estado: "activo" },
                { nombreGenero: "Salsa", descripcion: "Música tropical", estado: "activo" },
                { nombreGenero: "Balada", descripcion: "Música romántica", estado: "activo" },
                { nombreGenero: "Hip Hop", descripcion: "Música rap", estado: "activo" },
            ];

            for (const genero of generosBasicos) {
                await orm.genero.findOrCreate({
                    where: { nombreGenero: genero.nombreGenero },
                    defaults: genero,
                });
            }

            // Tallas básicas
            const tallasBasicas = [
                { nombreTalla: "XS", descripcion: "Extra pequeña", estado: "activo" },
                { nombreTalla: "S", descripcion: "Pequeña", estado: "activo" },
                { nombreTalla: "M", descripcion: "Mediana", estado: "activo" },
                { nombreTalla: "L", descripcion: "Grande", estado: "activo" },
                { nombreTalla: "XL", descripcion: "Extra grande", estado: "activo" },
                { nombreTalla: "XXL", descripcion: "Doble extra grande", estado: "activo" },
            ];

            for (const talla of tallasBasicas) {
                await orm.talla.findOrCreate({
                    where: { nombreTalla: talla.nombreTalla },
                    defaults: talla,
                });
            }

            return { error: false, status: 200, message: "Datos básicos inicializados correctamente" };

        } catch (error) {
            console.error("Error al inicializar datos:", error);
            return { error: true, status: 500, message: "Error al inicializar datos básicos" };
        }
    }
}

module.exports = new AuxiliaresService();
