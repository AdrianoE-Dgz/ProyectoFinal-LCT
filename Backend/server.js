// server.js
require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productos.routes.js');
const pedidosRoutes = require('./routes/pedidos.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const pool = require('./db/conexion.js'); // <-- Importamos la conexión
const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173/', // tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Rutas principales
app.use('/api/usuarios', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Funcion que hace una consulta de prueba mínima que
// confirma que todo el circuito conexión → consulta → respuesta está funcionando

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result'); //Le pide a MySQL que sume 1 + 1, y le ponga el alias result al valor
        console.log(' Conexión a la base de datos establecida. Resultado:', rows[0].result);
    } catch (error) {
        console.error("Ocurrio un error en la conexion: ", error);
    }
}

// Iniciar servidor y probar conexión
app.listen(PORT, async () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    await testConnection(); // <--------------------- se ejecuta al arrancar el servidor
});