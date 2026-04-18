const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Página de inicio (Login)
app.get('/', (req, res) => {
    res.render('login', { mensaje: "Bienvenido a TITANES F.C." });
});

// CAMBIA '/dashboard' POR '/menu' PARA QUE COINCIDA CON TU LOGIN
app.get('/menu', (req, res) => {
    res.render('menu'); 
});

// (Opcional) Deja esta también por si acaso
app.get('/dashboard', (req, res) => {
    res.render('menu'); 
});

app.listen(3001, () => {
    console.log('🚀 Frontend de TITANES corriendo en http://localhost:3001');
});