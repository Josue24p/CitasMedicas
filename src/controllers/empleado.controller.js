import { getConnection, sql } from "../database";

export const getEmpleado = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Empleado")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}

export const getEmpleadoById = async (req,res) => {
    const {id} = req.params;
    
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('Id', id)
    .query("SELECT * FROM Empleado WHERE id_empleado = @Id");
    console.log(result)
    res.send(result.recordset[0]);
}

export const createEmpleado = async (req,res) => {
    const {id_empleado ,nombre, apellido, telefono, email, id_espec, id_user, id_tipo} = req.body;


    if(nombre == null || apellido == null || email == null || telefono == null || id_espec == null || id_user == null || id_tipo == null) {
        return res.status(400).send('Todos los campos son obligatorios');

    }

    try {
        const pool = await getConnection();
        
        await pool.request()
        .input('Id_empleado', sql.Int, id_empleado)
        .input('Nombre', sql.VarChar, nombre)
        .input('Apellido', sql.VarChar, apellido)
        .input('Telefono', sql.Char, telefono)
        .input('Email', sql.VarChar, email)
        .input('Id_espec', sql.Int, id_espec)
        .input('Id_user', sql.Int, id_user)
        .input('Id_tipo', sql.Int, id_tipo)
        .query("INSERT INTO Empleado (id_empleado,nombre, apellido, telefono, email, id_espec, id_user, id_tipo) VALUES (@Id_empleado, @Nombre, @Apellido, @Telefono, @Email, @Id_espec, @Id_user, @Id_tipo)")
        console.log(id_empleado,nombre,apellido, telefono, email, id_espec, id_user, id_tipo ) 
        res.json({id_empleado, nombre,apellido, telefono, email, id_espec, id_user, id_tipo})
    } catch (error) {
        console.log(error)
        res.status(500);
    }
}
