const sql = require('../../../infrastructure/database/connection/dataBase.sql');
const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose');
const { descifrarDatos, cifrarDatos } = require('../../../application/use-cases/auth/encrypDates');

class ClienteService {

    descifrarSeguro(dato) {
        try { return dato ? descifrarDatos(dato) : ''; }
        catch { return ''; }
    }

    async obtenerActivos() {
        const [rows] = await sql.promise().query(`
            SELECT * FROM clientes WHERE stadoCliente = "activo"
        `);

        const clientes = await Promise.all(rows.map(async cli => {
            const mongoCli = await mongo.clienteModel.findOne({
                idClienteSql: cli.idClientes
            });

            return {
                ...cli,
                cedulaCliente: this.descifrarSeguro(cli.cedulaCliente),
                nombreCliente: this.descifrarSeguro(cli.nombreCliente),
                usernameCliente: this.descifrarSeguro(cli.usernameCliente),

                detallesMongo: mongoCli ? {
                    direccionCliente: this.descifrarSeguro(mongoCli.direccionCliente),
                    telefonoCliente: this.descifrarSeguro(mongoCli.telefonoCliente),
                    emailCliente: this.descifrarSeguro(mongoCli.emailCliente),
                    tipoCliente: mongoCli.tipoCliente
                } : null
            };
        }));

        return clientes;
    }

    async crearClienteSQL(data) {
        return await orm.cliente.create({
            cedulaCliente: cifrarDatos(data.cedulaCliente),
            nombreCliente: cifrarDatos(data.nombreCliente),
            usernameCliente: cifrarDatos(data.usernameCliente),
            passwordCliente: cifrarDatos(data.passwordCliente),
            stadoCliente: 'activo',
            createCliente: new Date().toLocaleString(),
        });
    }

    async crearClienteMongo(idClienteSql, data) {
        return await mongo.clienteModel.create({
            direccionCliente: cifrarDatos(data.direccionCliente || ''),
            telefonoCliente: cifrarDatos(data.telefonoCliente || ''),
            emailCliente: cifrarDatos(data.emailCliente || ''),
            tipoCliente: data.tipoCliente || 'Regular',
            idClienteSql
        });
    }

    async actualizarClienteSQL(id, data) {
        return await sql.promise().query(`
            UPDATE clientes SET 
                cedulaCliente = ?, 
                nombreCliente = ?, 
                usernameCliente = ?, 
                updateCliente = ?
            WHERE idClientes = ?
        `, [
            cifrarDatos(data.cedulaCliente),
            cifrarDatos(data.nombreCliente),
            cifrarDatos(data.usernameCliente),
            new Date().toLocaleString(),
            id
        ]);
    }

    async actualizarClienteMongo(id, data) {
        return await mongo.clienteModel.updateOne(
            { idClienteSql: id },
            {
                $set: {
                    direccionCliente: cifrarDatos(data.direccionCliente || ''),
                    telefonoCliente: cifrarDatos(data.telefonoCliente || ''),
                    emailCliente: cifrarDatos(data.emailCliente || ''),
                }
            }
        );
    }

    async eliminarCliente(id) {
        return sql.promise().query(`
            UPDATE clientes 
            SET stadoCliente = 'inactivo', updateCliente = ?
            WHERE idClientes = ?
        `, [new Date().toLocaleString(), id]);
    }
}

module.exports = new ClienteService();
