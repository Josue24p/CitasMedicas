import { Router } from 'express';

import  {getUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario} from '../controllers/usuario.controller';

const router = Router();

router.get('/usuario', getUsuario);
router.get('/usuario/:id', getUsuarioById);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);

export default router;