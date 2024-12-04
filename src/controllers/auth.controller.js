import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { insertUsuario } from "./usuario.controller";
import { createAccessToken } from '../libs/jwt';
import { getConnection, sql } from '../database';

export const signUp = async (req, res) => {
    const { nombre, apellido, dni, fech_nac, telefono, email, password, id_rol } = req.body;

    try {
        // Verificar que todos los campos estén llenos
        if (!nombre || !apellido || !dni || !fech_nac || !telefono || !email || !password || !id_rol) {
            return res.status(400).send('Todos los campos son obligatorios');
        }
        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear el usuario
        const newUser = await insertUsuario({
            nombre,
            apellido,
            dni,
            fech_nac,
            telefono,
            email,
            password: passwordHash,
            id_rol: id_rol || 2, //Asignar un rol de usuario (2) si no se pasa
        });
        const token = await createAccessToken({ id: newUser.id_user})
        //mostrar mensaje de json // son datos para que la interfaz de front-end lo use
        res.cookie('token', token)

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id_user: newUser.id_user,
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                dni: newUser.dni,
                fech_nac: newUser.fech_nac,
                telefono: newUser.telefono,
                email: newUser.email,
                password: newUser.password,
                id_rol: newUser.id_rol,
            },
            token, // Devolver el token en el JSON
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al registrar el usuario');
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validar que ambos campos estén presentes
        if (!email || !password) {
            return res.status(400).json({ message: 'El correo y la contraseña son obligatorios' });
        }

        const pool = await getConnection();

        // Buscar el usuario por su correo electrónico
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .query("SELECT * FROM usuario WHERE email = @Email");

        const user = result.recordset[0];

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token de acceso
        const token = await createAccessToken({ id: user.id_user });

        // Opcional: configurar una cookie con el token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        // Responder con los datos del usuario y el token
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id_user: user.id_user,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                id_rol: user.id_rol,
            },
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

export const logout = (req, res) => {
    res.cookie('token',"",{
        expires: new Date(0), 
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    try {
        // Verificar que `req.user` contenga el ID
        const userId = req.id_user;
        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        const pool = await getConnection();

        // Buscar el usuario por su ID
        const result = await pool.request()
            .input('Id', sql.Int, userId)
            .query("SELECT * FROM usuario WHERE id_user = @Id");

        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            id: user.id_user,
            username: user.nombre,
            apellido: user.apellido,
            dni: user.dni,
            fecha_nac: user.fech_nac,
            telefono: user.telefono,
            email: user.email,
            password: user.password // Considera eliminar esto por seguridad
        });
    } catch (error) {
        console.error("Error al obtener el perfil:", error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

