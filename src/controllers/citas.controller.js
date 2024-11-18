import { getConnection, sql } from "../database";

export const getCitas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM citas")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}

export const getCitasById = async (req,res) => {
    const {id_citas} = req.params;
    
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('Id', id_citas)
    .query("SELECT * FROM citas WHERE id_citas = @Id");
    console.log(result)
    res.json(result.recordset[0]);
}

export const crearCitas = async (req,res) => {
    const {estado, id_user, id_rt} = req.body;

    if(estado == null || id_user == null || id_rt == null) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const pool = await getConnection();
        
        await pool.request()
        .input('Estado', sql.VarChar, estado)
        .input('Id_user', sql.VarChar, id_user)
        .input('Id_rt', sql.Char, id_rt)
        .query("INSERT INTO citas (estado, id_user, id_rt) VALUES (@Estado, @Id_user, @Id_rt)")
        console.log(estado, id_user, id_rt)
        res.json({estado, id_user, id_rt})
    } catch (error) {
        console.log(error)
        res.status(500);
    }
}

// Actualizar cita
export const actualizarCitas = async (req, res) => {
    const { id_citas } = req.params

    const { estado, id_user, id_rt } = req.body

    if (!estado || !id_user || !id_rt ) {
        return res.status(400).json({ msg: 'Error, por favor llene todos los campos'})
    }

    try {
        const pool = await getConnection()
        await pool.request()
            .input('Id_citas', sql.Int, id_citas)
            .input('Estado', sql.VarChar, estado)
            .input('Id_user', sql.Int, id_user)
            .input('Id_rt', sql.Int, id_rt)
            .query("UPDATE citas SET estado = @Estado, id_user = @Id_user, id_rt = @Id_rt WHERE id_citas = @Id_citas")
            console.log(estado, id_user, id_rt )
        res.json({ estado, id_user, id_rt })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al actualizar la cita'})
    }
}

// Eliminar un medico
export const eliminarCitas = async (req, res) => {
    const { id_citas } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
           .input("Id", sql.Int, id_citas)
           .query("DELETE FROM citas WHERE id_citas = @Id")
        res.json({ msg: `La cita ${id_citas} ha sido eliminado` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al eliminar la cita' });
    }
}