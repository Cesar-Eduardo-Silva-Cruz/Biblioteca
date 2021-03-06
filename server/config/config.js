// PUERTO 
process.env.PORT = process.env.PORT || 3000;

// ENTORNO 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// FIRMA SECRETA DE JWT 
process.env.FIRMA = process.env.FIRMA || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.EXPTIME = process.env.EXPTIME || '20min';

// CONEXION A LA BASE DE DATOS 
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/biblioteca';
} else {
    urlDB = 'mongodb+srv://admin:P18boFlZlaZrUzAB@cluster0-pnond.mongodb.net/Biblioteca?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;