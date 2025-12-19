/*require('dotenv').config();
const MYSQLHOST = '31.97.42.126'; 
const MYSQLUSER = 'linkear';
const MYSQLPASSWORD = '0987021692@Rj';
const MYSQLDATABASE = 'indiec';
const MYSQLPORT = '3306';
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
};*/
const MYSQLHOST = process.env.MYSQLHOST || 'localhost'; 
const MYSQLUSER = process.env.MYSQLUSER || 'root';
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || '12345';
const MYSQLDATABASE = process.env.MYSQLDATABASE || 'indiec';
const MYSQLPORT = process.env.MYSQLPORT || '3306';
const MYSQL_URI = process.env.MYSQL_URI || '';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/indiec';

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