
import { getConnection, sql } from "../database";

export const verificarCorreo = async (req, res, next) => {

  try {
    const {email} = req.body;

    const pool = await getConnection();

    const result = await pool.request()
    .input('email',sql.VarChar, email)
    .query("SELECT * FROM usuario Where email = @email")

    const user = result.recordset[0];
    
    if(user) return res.status(400).json( ['El correo ya existe, intenta otra vez'])

    next();
  } catch (error) {
    console.error("Error al verificar el correo:", error.message);
    res.status(500).json({ message: 'Error al verificar el correo' });
  }
}
