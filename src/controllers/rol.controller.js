import { getConnection, sql } from "../database";

export const getRol = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Rol")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}