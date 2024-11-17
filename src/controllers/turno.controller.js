import { getConnection, sql } from "../database";
export const getRegistroTurno = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query("SELECT * FROM reg_turno")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}
export const getRegistroTurnoById = async (req, res) => {
    const { id_rt } = req.params
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('Id', id_rt)
        .query("SELECT * FROM reg_turno WHERE id_rt = @Id")
    console.log(result)
    res.json(result.recordset[0])
}
export const createRegistroTurno = async (req, res) => {
    const { num_pacientes, id_medico, id_horario } = req.body
    if ( num_pacientes == null || id_medico == null || id_horario ) {
        return res.status(400).send('Todos los campos son obligatorios')
    }
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input('Num_pacientes', sql.Int, num_pacientes)
            .input('Id_medico', sql.Int, id_medico)
            .input('Id_horario', sql.Int, id_horario)
            .query("INSERT INTO reg_turno (num_pacientes, id_medico, id_horario)" + "OUTPUT INSERTED.id_rt VALUES (@Num_pacientes, @Id_medico, @Id_horario)")
        const id_rt = result.recordset[0].id_rt
        console.log(num_pacientes, id_medico, id_horario)
        res.json( { num_pacientes, id_medico, id_horario } )
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
export const updateRegistroTurno = async (req, res) => {
    const { id_rt } = req.params
    const { num_pacientes, id_medico, id_horario } = req.body
    if (!num_pacientes || !id_medico || !id_horario ) {
        return res.status(400).json({ msg: 'Error, por favor llene todos los campos'})
    }
    try {
        const pool = await getConnection()
        await pool.request()
            .input('Id_rt', sql.Int, id_rt)
            .input('Num_pacientes', sql.Int, num_pacientes)
            .input('Id_medico', sql.Int, id_medico)
            .input('Id_horario', sql.Int, id_horario)
            .query("UPDATE reg_turno SET num_pacientes = @Num_pacientes, id_medico = @Id_medico, id_horario = @Id_horario WHERE id_rt = @Id_rt")
            console.log(num_pacientes, id_medico, id_horario)
        res.json({ num_pacientes, id_medico, id_horario })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al actualizar el turno'})
    }
}
export const deleteRegistroTurno = async (req, res) => {
    const { id_rt } = req.params
    try {
        const pool = await getConnection()
        await pool.request()
            .input('Id', sql.Int, id_rt)
            .query("DELETE FROM reg_turno WHERE id_rt = @Id_rt")
        res.json({ msg: `El turno ${id_rt} se ha eliminado correctamente`})
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: 'Error al eliminar el turno'})
    }
}