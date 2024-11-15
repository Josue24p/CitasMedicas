import express from 'express'//importar la librer├¡ express
import config from './config'
import { getConnection } from './database'
import especialidadRoutes from './routes/especialidad.routes';
import horarioRoutes from './routes/horario.routes';
import tipoRoutes from './routes/tipo.routes';
import empleadoRoutes from './routes/empleado.routes';
import usuarioRoutes from './routes/usuario.routes';

getConnection();

const app = express() //app tiene el uso del express

//settings
app.set("port",config.port)

//middlewares
app.use(express.json()) //permite  que los datos se envian en formato json
app.use(express.urlencoded({ extended: false }));//recibe datos que viene del formulario html

app.use(especialidadRoutes)
app.use(horarioRoutes)
app.use(tipoRoutes)
app.use(empleadoRoutes)
app.use(usuarioRoutes)


export default app //exportamos app
