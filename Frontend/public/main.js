const loginForm = document.querySelector('form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            // 1. Enviamos la petición al Backend
            const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // 2. Si el login es correcto, guardamos los datos del usuario
                alert('¡Bienvenido Titán!');
                localStorage.setItem('usuario', JSON.stringify(data.user));
                
                window.location.replace('/dashboard'); 
            } else {
                // Si las credenciales están mal
                alert('Atención: ' + data.message);
            }
        } catch (error) {
            // Si el backend no responde
            console.error('Detalle del error:', error);
            alert('Error: No se pudo conectar con el servidor de TITANES F.C. (Puerto 3000)');
        }
    });
}