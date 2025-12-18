const obtenerClientes = require('../../../application/use-cases/cliente/obtenerClientes.usecase');
const crearCliente = require('../../../application/use-cases/cliente/crearCliente.usecase');
const actualizarCliente = require('../../../application/use-cases/cliente/actualizarCliente.usecase');
const eliminarCliente = require('../../../application/use-cases/cliente/eliminarCliente.usecase');

const clienteCtl = {};

clienteCtl.mostrarClientes = async (req, res) => {
    try {
        const data = await obtenerClientes();
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

clienteCtl.crearCliente = async (req, res) => {
    try {
        const nuevo = await crearCliente(req.body);
        res.status(201).json({
            message: 'Cliente creado exitosamente',
            idCliente: nuevo.idClientes
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

clienteCtl.actualizarCliente = async (req, res) => {
    try {
        await actualizarCliente(req.params.id, req.body);
        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

clienteCtl.eliminarCliente = async (req, res) => {
    try {
        await eliminarCliente(req.params.id);
        res.json({ message: 'Cliente desactivado exitosamente' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = clienteCtl;
