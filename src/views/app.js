const API_BASE_URL = "http://localhost:3000";

// Función para cargar las especialidades
async function loadEspecialidades() {
    try {
        const response = await fetch(`${API_BASE_URL}/especialidades`);
        const especialidades = await response.json();
        const especialidadSelect = document.getElementById("especialidad");
        
        // Limpiar opciones anteriores
        especialidadSelect.innerHTML = "<option value=''>Selecciona una especialidad</option>";
        
        especialidades.forEach(especialidad => {
            const option = document.createElement("option");
            option.value = especialidad.id_espec;
            option.textContent = especialidad.nombre;
            especialidadSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar las especialidades:", error);
    }
}

// Función para cargar los médicos según la especialidad seleccionada
async function loadMedicos(especialidadId) {
    try {
        const response = await fetch(`${API_BASE_URL}/medico/especialidades/${especialidadId}`);
        const medicos = await response.json();
        const medicoSelect = document.getElementById("medico");
        
        // Limpiar opciones anteriores
        medicoSelect.innerHTML = "<option value=''>Selecciona un médico</option>";

        medicos.forEach(medico => {
            const option = document.createElement("option");
            option.value = medico.id_medico;
            option.textContent = `${medico.nombre} ${medico.apellido}`;
            medicoSelect.appendChild(option);
        });
        
        // Habilitar el selector de médicos
        medicoSelect.disabled = false;

    } catch (error) {
        console.error("Error al cargar los médicos:", error);
    }
}

// Función para cargar los turnos disponibles según el médico seleccionado
async function loadTurnos(medicoId) {
    try {
        const response = await fetch(`${API_BASE_URL}/turno/medico/${medicoId}`);
        const turnos = await response.json();
        const turnoSelect = document.getElementById("turno");
        // Limpiar opciones anteriores
        turnoSelect.innerHTML = "<option value=''>Selecciona un turno</option>";
        
         turnos.forEach(turno => {
             const option = document.createElement("option");
             option.value = turno.id_horario;
             option.textContent = turno.id_horario;
             turnoSelect.appendChild(option);
        });
        
        // Habilitar el selector de turnos
        turnoSelect.disabled = false;

    } catch (error) {
        console.error("Error al cargar los turnos:", error);
    }
}

// Función para cargar los horarios disponibles según el turno seleccionado
async function loadHorarios(turnoId) {
    
    try {
        const response = await fetch(`http://localhost:3000/horario/turno/${turnoId}`);
        if (!response.ok) throw new Error('Error al cargar los horarios');

        const horarios = await response.json();
        const horarioSelect = document.getElementById('horario');

        // Limpiar opciones anteriores
        horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';

        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario.id_horario;
            option.textContent = `${horario.hora_inicio} - ${horario.hora_fin}`;
            horarioSelect.appendChild(option);
        });

        horarioSelect.disabled = false;
    } catch (error) {
        console.error('Error al cargar los horarios:', error);
    }
}





// Función para reservar la cita
async function reservarCita(event) {
    event.preventDefault();  // Evita el envío del formulario por defecto

    const especialidad = document.getElementById("especialidad").value;
    const medico = document.getElementById("medico").value;
    const turno = document.getElementById("turno").value;
    const horario = document.getElementById("horario").value;

    if (!especialidad || !medico || !turno || !horario) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const citaData = {
        especialidad_id: especialidad,
        medico_id: medico,
        turno_id: turno,
        horario_id: horario,
        usuario_id: 1 // Aquí deberías usar el ID del paciente logueado
    };

    try {
        const response = await fetch(`${API_BASE_URL}/citas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(citaData)
        });

        const result = await response.json();
        
        if (result.success) {
            alert("¡Cita reservada con éxito!");
            document.getElementById("reserva-form").reset();  // Limpiar formulario
        } else {
            alert("Error al reservar la cita. Intenta de nuevo.");
        }

    } catch (error) {
        console.error("Error al reservar la cita:", error);
        alert("Hubo un problema al intentar reservar la cita.");
    }
}


// Iniciar el proceso de carga de datos
document.addEventListener("DOMContentLoaded", () => {
    loadEspecialidades();

    // Manejo de cambios en los selectores
    document.getElementById("especialidad").addEventListener("change", (e) => {
        const especialidadId = e.target.value;
        if (especialidadId) {
            loadMedicos(especialidadId);
        }
    });

    document.getElementById("medico").addEventListener("change", (e) => {
        const medicoId = e.target.value;
        if (medicoId) {
            loadTurnos(medicoId);
        }
    });

    document.getElementById("turno").addEventListener("change", (e) => {
        const turnoId = e.target.value;
        if (turnoId) {
            loadHorarios(turnoId);
        }
    });

    // Manejo de envío del formulario
    document.getElementById("reserva-form").addEventListener("submit", reservarCita);
});




