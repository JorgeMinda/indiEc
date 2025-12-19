// src/infrastructure/http/controller/evento.controller.js
const path = require('path');
const ObtenerEventos = require('../../../application/use-cases/evento/ObtenerEventos.usecase.js');
const CrearEvento = require('../../../application/use-cases/evento/CrearEvento.usecase.js');
const ActualizarEvento = require('../../../application/use-cases/evento/ActualizarEvento.usecase.js');
const EliminarEvento = require('../../../application/use-cases/evento/EliminarEvento.usecase.js');

const eventoCtl = {};

eventoCtl.obtenerEventos = async (req, res) => {
    try {
        const eventos = await ObtenerEventos();
        res.json(eventos || []); // siempre devuelve array
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message || 'Error interno' });
    }
};

eventoCtl.crearEvento = async (req, res) => {
    try {
        let imagenNombre = null;

        // Solo intenta mover si hay archivo
        if (req.files && req.files.imagen) {
            imagenNombre = Date.now() + '-' + req.files.imagen.name; // nombre único para evitar conflictos
            const uploadPath = path.join(__dirname, '../../../../public/uploads', imagenNombre);
            await req.files.imagen.mv(uploadPath);
        }

        const data = {
            nombreEvento: req.body.nombreEvento,
            ubicacion: req.body.ubicacion,
            fecha: req.body.fecha,
            generoMusical: req.body.generoMusical,
            contacto: req.body.contacto || '',
            capacidad: req.body.capacidad ? parseInt(req.body.capacidad) : null,
            descripcion: req.body.descripcion || '',
            imagen: imagenNombre
        };

        await CrearEvento(data);
        res.json({ message: 'Evento creado exitosamente' });
    } catch (error) {
        console.error('Error creando evento:', error);
        res.status(500).json({ message: error.message || 'Error al crear el evento' });
    }
};

eventoCtl.actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        let imagenNombre = undefined;

        if (req.files && req.files.imagen) {
            imagenNombre = Date.now() + '-' + req.files.imagen.name;
            const uploadPath = path.join(__dirname, '../../../../public/uploads', imagenNombre);
            await req.files.imagen.mv(uploadPath);
        }

        const data = {
            nombreEvento: req.body.nombreEvento,
            ubicacion: req.body.ubicacion,
            fecha: req.body.fecha,
            generoMusical: req.body.generoMusical,
            contacto: req.body.contacto || '',
            capacidad: req.body.capacidad ? parseInt(req.body.capacidad) : undefined,
            descripcion: req.body.descripcion || '',
            imagen: imagenNombre
        };

        await ActualizarEvento(id, data);
        res.json({ message: 'Evento actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando:', error);
        res.status(500).json({ message: error.message });
    }
};

eventoCtl.eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        await EliminarEvento(id);
        res.json({ message: 'Evento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = eventoCtl;