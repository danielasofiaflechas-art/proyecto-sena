const express = require('express'); // <--- FALTA ESTA
const router = express.Router();    // <--- Y ESTA TAMBIÉN
const db = require('../config/db');

// Registrar Entrenador (Doble inserción: Usuario + Detalles)
router.post('/registrar-completo', async (req, res) => {
    const { nombre, email, password, especialidad, experiencia_años } = req.body;
    try {
        // 1. Insertar en la tabla usuarios
        const [userRes] = await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, "entrenador")',
            [nombre, email, password]
        );
        const nuevoId = userRes.insertId;

        // 2. Insertar en la tabla entrenadores usando ese ID
        await db.query(
            'INSERT INTO entrenadores (usuario_id, especialidad, experiencia_años) VALUES (?, ?, ?)',
            [nuevoId, especialidad, experiencia_años]
        );

        res.json({ message: 'Entrenador creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todos los entrenadores (necesaria para la tabla)
router.get('/todos', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT u.id, u.nombre, u.email, e.especialidad, e.experiencia_años, e.usuario_id 
            FROM usuarios u 
            JOIN entrenadores e ON u.id = e.usuario_id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // <--- ESTA TAMBIÉN ES VITAL