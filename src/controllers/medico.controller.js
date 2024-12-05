import { getConnection, sql } from "../database";

export const getMedico = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM medico")
        //validar si el registro existe (si hay datos en la tabla medico)
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No hay registros de medicos.' });
        }else {
            console.log(result);
            res.json(result.recordset)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getMedicoById = async (req,res) => {
    const {id} = req.params;
    
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('Id', id)
    .query("SELECT * FROM medico WHERE id_medico = @Id");
    //validar si el registro existe
        //2da opcion
        if (result.recordset != 0) {
            console.log(result)
            return res.json(result.recordset[0])
        }else {
            return res.status(404).json({ message: 'Medico no encontrado' });
        }
}

export const crearMedico = async (req,res) => {
    const {nombre, apellido, telefono, dni, fecha_nac, email, id_espec} = req.body;


    if(nombre == null || apellido == null || telefono == null || dni == null || fecha_nac == null || email == null || id_espec == null) {
        return res.status(400).send('Todos los campos son obligatorios');

    }

    try {
        const pool = await getConnection();
        
        const result = await pool.request()
        //.input('Id_medico', sql.Int, id_medico) //no es necesario ingresar este campo
        .input('Nombre', sql.VarChar, nombre)
        .input('Apellido', sql.VarChar, apellido)
        .input('Telefono', sql.Char, telefono)
        .input('Dni', sql.Char, dni)
        .input('Fecha_nac', sql.Date, fecha_nac)
        .input('Email', sql.VarChar, email)
        .input('Id_espec', sql.Int, id_espec)
        .query("INSERT INTO medico (nombre, apellido, telefono, dni, fecha_nac, email, id_espec) OUTPUT INSERTED.id_medico VALUES (@Nombre, @Apellido, @Telefono, @Dni, @Fecha_nac, @Email, @Id_espec)")
        const id_medico = result.recordset[0].id_medico
        console.log(id_medico, nombre, apellido, telefono, dni, fecha_nac, email, id_espec) 
        res.json({id_medico, nombre, apellido, telefono, dni, fecha_nac, email, id_espec})
    } catch (error) {
        console.log(error)
        res.status(500);
    }
}

// Actualizar un medico
export const actualizarMedico = async (req, res) => {
    const { id } = req.params

    const { nombre, apellido, telefono, dni, fecha_nac, email, id_espec } = req.body

    if (!nombre || !apellido || !telefono || !dni || !fecha_nac || !email || !id_espec ) {
        console.log(nombre, apellido, telefono, dni, fecha_nac, email, id_espec)
        return res.status(400).json({ msg: 'Error, por favor llene todos los campos'})
    }

    try {
        const pool = await getConnection()
        await pool.request()
            .input('Id_medico', sql.Int, id)
            .input('Nombre', sql.VarChar, nombre)
            .input('Apellido', sql.VarChar, apellido)
            .input('Telefono', sql.Char, telefono)
            .input('Dni', sql.Char, dni)
            .input('Fecha_nac', sql.Date, fecha_nac)
            .input('Email', sql.VarChar, email)
            .input('Id_espec', sql.Int, id_espec)
            .query("UPDATE medico SET nombre = @Nombre, apellido = @Apellido, telefono = @Telefono, dni = @Dni, fecha_nac = @Fecha_nac, email = @Email, id_espec = @Id_espec WHERE id_medico = @Id_medico")
            console.log(nombre, apellido, telefono, dni, fecha_nac, email, id_espec )
        res.json({ nombre, apellido, telefono, dni, fecha_nac, email, id_espec })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al actualizar el Médico'})
    }
}

// Eliminar un medico
export const eliminarMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
           .input("Id", sql.Int, id)
           .query("DELETE FROM medico WHERE id_medico = @Id")
           if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ msg: `El medico ${id} ha sido eliminado` }); 
        }else{
            return res.status(404).json({ msg: `El medico ${id} no existe`});  
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al eliminar al medico' });
    }
}

// medico.controller.js

export const getMedicosByEspecialidad = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('Id_espec', sql.Int, id)
            .query("SELECT * FROM medico WHERE id_espec = @Id_espec");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No hay médicos para esta especialidad.' });
        }

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener médicos por especialidad.' });
    }
};
