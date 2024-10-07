document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío normal del formulario
    
    // Obtener el valor del nombre de usuario
    const username = document.getElementById('exampleInputEmail1').value;

    // Guardar el nombre de usuario en localStorage
    localStorage.setItem('username', username);

    // Redirigir a la página deseada
    window.location.href = 'ecositemas.html';
});
