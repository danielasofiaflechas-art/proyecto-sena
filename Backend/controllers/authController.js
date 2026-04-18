const db = require('../config/db');

exports.login = async (req, res) => {
    // ESTO DEBE APARECER EN TU CONSOLA NEGRA
    console.log("=== INTENTO DE LOGIN RECIBIDO ===");
    console.log("Datos recibidos:", req.body);

    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        
        console.log("Resultado de la DB:", rows);

        if (rows.length > 0) {
            const user = rows[0];
            res.status(200).json({
                success: true,
                message: "¡Bienvenido Titán!",
                user: { id: user.id, nombre: user.nombre, rol: user.rol }
            });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (error) {
        // ESTO NOS DIRÁ EL ERROR REAL
        console.error("❌ ERROR CRÍTICO EN LA DB:", error.message);
        res.status(500).json({ success: false, message: "Error en el servidor: " + error.message });
    }
};