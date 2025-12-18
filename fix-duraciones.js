// fix-duraciones.js
// Script para corregir las duraciones con URL encoding en MongoDB

const mongoose = require('mongoose');

// Conectar a MongoDB
const MONGO_URI = 'mongodb://localhost:27017/indiec'; // Ajusta si tu DB tiene otro nombre

async function corregirDuraciones() {
    try {
        console.log('🔌 Conectando a MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a MongoDB');

        // Obtener el modelo de canciones
        const Cancion = mongoose.model('canciones', new mongoose.Schema({
            duracion: String,
            genero: String,
            imagen: String,
            idCancionSql: String,
            createCancionMongo: String,
            updateCancionMongo: String,
        }, {
            timestamps: false,
            collection: 'canciones'
        }));

        // Buscar todas las canciones
        const canciones = await Cancion.find({});
        console.log(`📊 Se encontraron ${canciones.length} canciones`);

        let corregidas = 0;

        // Corregir cada canción
        for (const cancion of canciones) {
            if (cancion.duracion && cancion.duracion.includes('%3A')) {
                const duracionOriginal = cancion.duracion;
                const duracionCorregida = decodeURIComponent(cancion.duracion);
                
                await Cancion.updateOne(
                    { _id: cancion._id },
                    { $set: { duracion: duracionCorregida } }
                );

                console.log(`✅ Corregido: "${duracionOriginal}" → "${duracionCorregida}" (ID: ${cancion.idCancionSql})`);
                corregidas++;
            }
        }

        console.log(`\n🎉 Proceso completado:`);
        console.log(`   - Total de canciones: ${canciones.length}`);
        console.log(`   - Canciones corregidas: ${corregidas}`);
        console.log(`   - Sin cambios: ${canciones.length - corregidas}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Desconectado de MongoDB');
        process.exit(0);
    }
}

// Ejecutar el script
corregirDuraciones();