import { Router } from 'express';

import  {getUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, crearUsuarioGlobal} from '../controllers/usuario.controller';

const router = Router();

router.get('/usuario', getUsuario);
router.get('/usuario/:id', getUsuarioById);
/* router.post('/usuario', createUsuario); */
router.post('/usuario', crearUsuarioGlobal);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);

export default router;