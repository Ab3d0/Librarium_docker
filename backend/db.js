import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,

});

connection.connect(err => {
    if(err){
        console.error('Erreur de connection à MySQL :', err);
    }else{
        console.log('Connecté à la base MySQL')
    }
});

export default connection;

