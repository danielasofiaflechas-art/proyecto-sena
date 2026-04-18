const express = require('express');
const router = express.Router();
const db = require('../config/db');

// OBTENER TODOS LOS PAGOS
router.get('/todos', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.id, p.monto, p.fecha_pago, p.mes_correspondiente, u.nombre 
            FROM pagos p 
            JOIN usuarios u ON p.jugador_id = u.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REGISTRAR PAGO
router.post('/registrar', async (req, res) => {
    const { jugador_id, monto, mes_correspondiente } = req.body;
    try {
        await db.query(
            'INSERT INTO pagos (jugador_id, monto, fecha_pago, mes_correspondiente) VALUES (?, ?, NOW(), ?)',
            [jugador_id, monto, mes_correspondiente]
        );
        res.json({ message: 'Pago guardado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;