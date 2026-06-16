// server.js
require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');

const productRoutes = require('./rutas/productos.rutas.js');
const authRoutes = require('./rutas/auth.routas.js');
const pool = require('./BD/database.js'); // <-- Importamos la conexión
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Rutas principales
app.use('/api/usuarios', authRoutes);
app.use('/api/productos', productRoutes);

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