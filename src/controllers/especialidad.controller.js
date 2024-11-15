import { getConnection, sql } from "../database";

export const getEspecialidad = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM ESPECIALIDAD")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}