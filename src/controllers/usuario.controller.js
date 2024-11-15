import { getConnection, sql } from "../database";

export const getUsuario = async (req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Usuario")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}

export const getUsuarioById = async (req,res) => {
    const {id} = req.params;
    
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('Id', id)
    .query("SELECT * FROM Usuario WHERE id_user = @Id");
    console.log(result)
    res.send(result.recordset[0]);
}


