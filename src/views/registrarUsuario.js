// registrarUsuario.js

async function obtenerRoles() {
    try {
        const response = await fetch('https://citasmedicasutp.onrender.com/api/rol'); // Cambia esta URL si es necesario
        const roles = await response.json();
        
        const select = document.getElementById('id_rol');
        
        // Limpiar el select antes de agregar las opciones
        select.innerHTML = '<option value="">Seleccione un rol</option>';

        roles.forEach(rol => {
            const option = document.createElement('option');
            option.value = rol.id_rol; // Valor del ID del rol
            option.textContent = rol.nombre; // Nombre del rol
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener roles:', error);
    }
}

// Función para enviar el formulario
async function registrarUsuario(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const form = event.target;
    const formData = new FormData(form);

    // Crear un objeto con los datos del formulario
    const UsuarioData = {};
    formData.forEach((value, key) => {
        UsuarioData[key] = value;
    });

    // Enviar los datos al backend
    try {
        const response = await fetch('https://citasmedicasutp.onrender.com/api/usuario', { // URL de producción
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UsuarioData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Usuario registrado con éxito');
            form.reset(); // Limpiar el formulario después de registrar
        } else {
            alert('Error al registrar el usuario: ' + result.error);
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}

// Inicialización de la página
document.addEventListener('DOMContentLoaded', () => {
    obtenerRoles(); // Llamar a la función para cargar los roles
    document.getElementById('registroUsuarioForm').addEventListener('submit', registrarUsuario); // Manejar el envío del formulario
});
