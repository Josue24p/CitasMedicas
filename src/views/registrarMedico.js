// registrarMedico.js

async function obtenerEspecialidades() {
    try {
        const response = await fetch('https://citasmedicasutp.onrender.com/api/especialidad'); // URL de producción
        const especialidades = await response.json();
        
        console.log('Especialidades recibidas:', especialidades); // Agregar esta línea para depurar

        const select = document.getElementById('id_espec');
        
        // Limpiar el select antes de agregar las opciones
        select.innerHTML = '<option value="">Seleccione una especialidad</option>';

        especialidades.forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad.id_espec; // Valor del ID de especialidad
            option.textContent = especialidad.nombre; // Nombre de la especialidad
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener especialidades:', error);
    }
}


// Función para enviar el formulario
async function registrarMedico(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const form = event.target;
    const formData = new FormData(form);

    // Crear un objeto con los datos del formulario
    const medicoData = {};
    formData.forEach((value, key) => {
        medicoData[key] = value;
    });

    // Enviar los datos al backend
    try {
        const response = await fetch('https://citasmedicasutp.onrender.com/api/medico', { // URL de producción
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicoData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Médico registrado con éxito');
            form.reset(); // Limpiar el formulario después de registrar
        } else {
            alert('Error al registrar el médico: ' + result.error);
        }
    } catch (error) {
        console.error('Error al registrar el médico:', error);
    }
}

// Inicialización de la página
document.addEventListener('DOMContentLoaded', () => {
    obtenerEspecialidades(); // Llamar a la función para cargar las especialidades
    document.getElementById('formMedico').addEventListener('submit', registrarMedico); // Manejar el envío del formulario
});
