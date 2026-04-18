const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los partidos
router.get('/todos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM partidos ORDER BY fecha ASC');
        res.json(rows);
    } catch (error) {
        console.error("Error en MySQL:", error);
        res.status(500).json({ error: error.message });
    }
});

// Registrar un nuevo partido
router.post('/registrar', async (req, res) => {
    const { rival, fecha, lugar, categoria } = req.body;
    try {
        const query = 'INSERT INTO partidos (rival, fecha, lugar, resultado, categoria) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [rival, fecha, lugar, 'Por jugar', categoria]);
        res.json({ message: 'Partido programado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;