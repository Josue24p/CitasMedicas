import { getConnection, sql } from "../database";

export const getHorario = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Horario")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}

export const getHorariosByTurno = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('Id_turno', sql.Int, id)
            .query("SELECT * FROM horario WHERE id_horario = @Id_turno");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No hay horarios para este turno.' });
        }

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener horarios del turno.' });
    }
};