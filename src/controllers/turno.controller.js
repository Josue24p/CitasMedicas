import { getConnection, sql } from "../database";
export const getRegistroTurno = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query("SELECT * FROM reg_turno")
        //validar si hay datos de turno 1ra opcion
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No hay registros.' });
        }else {
            console.log(result);
            res.json(result.recordset)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener datos de turno.' });
    }
}
export const getRegistroTurnoById = async (req, res) => {
    const { id } = req.params
    const pool = await getConnection()
    try {

        const result = await pool
            .request()
            .input('Id', id)
            .query("SELECT * FROM reg_turno WHERE id_rt = @Id")

        //validar si el registro existe
        //2da opcion
        if (result.recordset != 0) {
            console.log(result)
            return res.json(result.recordset[0])
        }else {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener el turno.' });
    }

}
export const createRegistroTurno = async (req, res) => {
    const { num_pacientes, id_medico, id_horario } = req.body

    if (num_pacientes == null || id_medico == null || id_horario == null) {
        return res.status(400).send('Todos los campos son obligatorios')
    }
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input('Num_pacientes', sql.Int, num_pacientes)
            .input('Id_medico', sql.Int, id_medico)
            .input('Id_horario', sql.Int, id_horario)
            .query("INSERT INTO reg_turno (num_pacientes, id_medico, id_horario)" + "OUTPUT INSERTED.id_rt VALUES (@Num_pacientes, @Id_medico, @Id_horario)")
        const id = result.recordset[0].id_rt
        console.log(id, num_pacientes, id_medico, id_horario)
        res.json({ id, num_pacientes, id_medico, id_horario })
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
export const updateRegistroTurno = async (req, res) => {
    const { id } = req.params
    const { num_pacientes, id_medico, id_horario } = req.body
    if (!num_pacientes || !id_medico || !id_horario) {
        return res.status(400).json({ msg: 'Error, por favor llene todos los campos' })
    }
    try {
        const pool = await getConnection()
        await pool.request()
            .input('Id_rt', sql.Int, id)
            .input('Num_pacientes', sql.Int, num_pacientes)
            .input('Id_medico', sql.Int, id_medico)
            .input('Id_horario', sql.Int, id_horario)
            .query("UPDATE reg_turno SET num_pacientes = @Num_pacientes, id_medico = @Id_medico, id_horario = @Id_horario WHERE id_rt = @Id_rt")
        console.log(num_pacientes, id_medico, id_horario)
        res.status(200).json({ num_pacientes, id_medico, id_horario })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al actualizar el turno' })
    }
}
export const deleteRegistroTurno = async (req, res) => {
    const { id } = req.params
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .query("DELETE FROM reg_turno WHERE id_rt = @Id")
            //Validar si se eliminó alguna fila (si el id existe)
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ msg: `El turno ${id} se ha eliminado correctamente` }) 
        }else{
            return res.status(404).json({ msg: `El turno ${id} no existe`});  
        }
       
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: 'Error al eliminar el turno' })
    }
}