import express from 'express';
import {sequelize} from './config/config.js';


const app = express();

// Middleware para analizar json
app.use(express.json());

// Prueba de conexion a BD
sequelize.authenticate()
    .then(()=>console.log('Conexión a la BD establecida'))
    .catch((error)=>console.error('Error en la conexion a la BD: ',error));

// Ruta de prueba

app.get('/',(req,res)=>{
    res.send('Servidor en marcha papa');
});

// Iniciar servidorS

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Servidor en marcha en http://localhost:${PORT}`);
})