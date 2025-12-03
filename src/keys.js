const MYSQLHOST = process.env.MYSQLHOST || 'localhost'; 
const MYSQLUSER = process.env.MYSQLUSER || 'root';
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || '12345';
const MYSQLDATABASE = process.env.MYSQLDATABASE || 'indiec';
const MYSQLPORT = process.env.MYSQLPORT || '3306';
const MYSQL_URI = process.env.MYSQL_URI || '';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ravvilla:12345@indiec.fbkbcwr.mongodb.net/';

// Exportar las variables de configuración
module.exports = {
    MYSQLHOST,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE,
    MYSQLPORT,
    MYSQL_URI,
    MONGODB_URI
};