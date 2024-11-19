// const API_BASE_URL = "https://citasmedicasutp.onrender.com/api";

// // Función para registrar un médico
// async function registrarMedico(event) {
//     event.preventDefault(); // Evita el envío por defecto del formulario

//     // Obtiene los valores del formulario
//     const nombre = document.getElementById("nombre").value.trim();
//     const apellido = document.getElementById("apellido").value.trim();
//     const telefono = document.getElementById("telefono").value.trim();
//     const dni = document.getElementById("dni").value.trim();
//     const fechaNacimiento = document.getElementById("fecha_nac").value;
//     const email = document.getElementById("email").value.trim();
//     const especialidad = document.getElementById("especialidad").value;

//     // Validar campos
//     if (!nombre || !apellido || !telefono || !dni || !fechaNacimiento || !email || !especialidad) {
//         alert("Por favor, completa todos los campos.");
//         return;
//     }

//     // Datos del médico
//     const medicoData = {
//         nombre,
//         apellido,
//         telefono,
//         dni,
//         fecha_nacimiento: fechaNacimiento,
//         email,
//         especialidad_id: especialidad,
//     };

//     try {
//         // Enviar la solicitud POST para registrar al médico
//         const response = await fetch(`${API_BASE_URL}/medicos`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(medicoData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             alert("¡Médico registrado con éxito!");
//             document.getElementById("medico-form").reset(); // Limpiar formulario
//         } else {
//             console.error("Error en la respuesta:", result);
//             alert(result.message || "Error al registrar el médico.");
//         }
//     } catch (error) {
//         console.error("Error al registrar el médico:", error);
//         alert("Hubo un problema al intentar registrar al médico.");
//     }
// }

// // Función para cargar las especialidades desde la API
// async function loadEspecialidadesForMedico() {
//     try {
//         const response = await fetch(`${API_BASE_URL}/especialidades`);

//         // Verifica si la respuesta es válida
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }

//         const especialidades = await response.json();

//         const selectEspecialidad = document.getElementById("especialidad");

//         // Agregar cada especialidad al select
//         especialidades.forEach((especialidad) => {
//             const option = document.createElement("option");
//             option.value = especialidad.id;
//             option.textContent = especialidad.nombre;
//             selectEspecialidad.appendChild(option);
//         });
//     } catch (error) {
//         console.error("Error al cargar las especialidades:", error);
//         alert("Hubo un problema al cargar las especialidades. Intenta más tarde.");
//     }
// }

// // Configurar eventos cuando el DOM esté listo
// document.addEventListener("DOMContentLoaded", () => {
//     // Cargar especialidades
//     loadEspecialidadesForMedico();

//     // Configurar evento de envío del formulario
//     document.getElementById("medico-form").addEventListener("submit", registrarMedico);
// });
