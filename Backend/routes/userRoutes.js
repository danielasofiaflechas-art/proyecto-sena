const express = require('express');
const router = express.Router();
const db = require('../config/db');

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            res.json({ user: rows[0] });
        } else {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// OBTENER TODOS
router.get('/todos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REGISTRAR JUGADOR
router.post('/registrar', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        await db.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)', [nombre, email, password, rol]);
        res.json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ELIMINAR USUARIO
router.delete('/eliminar/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;