import { getConnection, sql } from "../database";

export const getTipo = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Tipo")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}