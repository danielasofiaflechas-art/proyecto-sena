const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importar Rutas
const userRoutes = require('./routes/userRoutes');
const entrenadorRoutes = require('./routes/entrenadorRoutes');
const partidoRoutes = require('./routes/partidoRoutes');
const pagoRoutes = require('./routes/pagoRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definición de Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/partidos', partidoRoutes);
app.use('/api/pagos', pagoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de TITANES F.C. corriendo en el puerto ${PORT}`);
});