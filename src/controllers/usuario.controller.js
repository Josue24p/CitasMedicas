import { getConnection, sql } from "../database";

export const getUsuario = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Usuario")
        console.log(result);
        res.json(result.recordset)
    } catch (error) {
        console.log(error)
    }
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
        .request()
        .input('Id', id)
        .query("SELECT * FROM Usuario WHERE id_user = @Id");
    console.log(result)
    res.send(result.recordset[0]);
}

export const createUsuario = async (req, res) => {
    const { nombre, apellido, dni, fech_nac, telefono, email, password, id_rol } = req.body;


    if (nombre == null || apellido == null || dni == null || fech_nac == null || telefono == null || password == null || id_rol == null) {
        return res.status(400).send('Todos los campos son obligatorios');

    }

    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input('Id_user', sql.Int, id_user)
            .input('Nombre', sql.VarChar, nombre)
            .input('Apellido', sql.VarChar, apellido)
            .input('Dni', sql.Char, dni)
            .input('Fech_nac', sql.Date, fech_nac)
            .input('Telefono', sql.Char, telefono)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .input('Id_rol', sql.Int, id_rol)
            .query("INSERT INTO usuario (nombre, apellido, dni, fech_nac, telefono, email, password,id_rol)" +
                "OUTPUT INSERTED.id_user VALUES (@Nombre, @Apellido, @Dni, @Fech_nac, @Telefono, @Email, @Password, @Id_rol)")
        // El ID generado está en result.recordset[0].id_user
        const id_user = result.recordset[0].id_user;
        console.log(id_user, nombre, apellido, dni, fech_nac, telefono, email, password, id_rol)
        res.json({ id_user, nombre, apellido, dni, fech_nac, telefono, email, password, id_rol })
    } catch (error) {
        console.log(error)
        res.status(500);
    }
}

/*Se agrega función insertar usuario de forma global donde se puede guardar los datos recibidos en una constante userData y capturar el ID Generado la cual vamos a guardar en un parametro. Luego se usa otra función de crear el usuario 
donde vamos a llamar a la función creada y los datos que se reciba se guardará en el parametro creado en la anterior función, cosa que genera un nuevo usuario*/
export const insertUsuario = async (userData) => {
    const { nombre, apellido, dni, fech_nac, telefono, email, password, id_rol } = userData;

    if (!nombre || !apellido || !dni || !fech_nac || !telefono || !email || !password || !id_rol) {
        throw new Error('Todos los campos son obligatorios');
    }

    const pool = await getConnection();
    const result = await pool.request()
        .input('Nombre', sql.VarChar, nombre)
        .input('Apellido', sql.VarChar, apellido)
        .input('Dni', sql.Char, dni)
        .input('Fech_nac', sql.Date, fech_nac)
        .input('Telefono', sql.Char, telefono)
        .input('Email', sql.VarChar, email)
        .input('Password', sql.VarChar, password)
        .input('Id_rol', sql.Int, id_rol)
        .query(`
            INSERT INTO usuario (nombre, apellido, dni, fech_nac, telefono, email, password, id_rol)
            OUTPUT INSERTED.id_user
            VALUES (@Nombre, @Apellido, @Dni, @Fech_nac, @Telefono, @Email, @Password, @Id_rol)
        `);

        return { id_user: result.recordset[0].id_user, ...userData }; // Devuelve el usuario creado
};

export const crearUsuarioGlobal = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await insertUsuario(userData);
        res.json(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error al crear el usuario global' });
    }
}

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, fech_nac, telefono, email, password, id_rol } = req.body;
    if (!nombre || !apellido || !dni || !fech_nac || !telefono || !email || !password || !id_rol) {
        return res.status(400).json({ msg: 'Error, por favor llene todos los campos' });
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id_user', sql.Int, id)
            .input('Nombre', sql.VarChar, nombre)
            .input('Apellido', sql.VarChar, apellido)
            .input('Dni', sql.Char, dni)
            .input('Fech_nac', sql.Date, fech_nac)
            .input('Telefono', sql.Char, telefono)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .input('Id_rol', sql.Int, id_rol)
            .query("UPDATE Usuario SET nombre = @Nombre, apellido = @Apellido, dni = @Dni, fech_nac = @Fech_nac, telefono = @Telefono, email = @Email, password = @Password, id_rol = @Id_rol WHERE id_user = @Id_user")
            console.log(nombre, apellido, dni, fech_nac, telefono, email, password, id_rol)
        res.json({ nombre, apellido, dni, fech_nac, telefono, email, password, id_rol });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al actualizar la usuario' });
    }
}

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
           .input("Id", sql.Int, id)
           .query("DELETE FROM Usuario WHERE Id_user = @Id")
        res.json({ msg: `El usuario ${id} ha sido eliminado` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}