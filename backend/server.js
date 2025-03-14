import express from 'express';
import cors from 'cors';
import {sequelize} from './config/config.js';
import planesRoutes from './routes/planes.js';
import practicasRoutes from './routes/practicas.js';
import prestadoresRoutes from './routes/prestadores.js';

const app = express();

// Habilitar Cors Local
/* app.use(cors({
    origin: 'http://localhost:5173', // Permite solo a este dominio
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: 'Content-Type, Authorization'
})) */

// Habilitar Cors Servidor
app.use(cors({
    origin: 'https://traditum-production.up.railway.app', // Permite solo a este dominio
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: 'Content-Type, Authorization'
}))


// Middleware para analizar json
app.use(express.json());



// Prueba de conexion a BD
sequelize.authenticate()
    .then(()=>console.log('Conexión a la BD establecida 🔥🔥'))
    .catch((error)=>console.error('Error en la conexion a la BD: ',error));

// Ruta de prueba

app.get('/',(req,res)=>{
    res.send('Servidor en marcha papa');
});


app.use('/api/planes', planesRoutes);
app.use('/api/practicas', practicasRoutes);
app.use('/api/prestadores', prestadoresRoutes);
// Iniciar servidorS

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Servidor en marcha en http://localhost:${PORT}`);
})