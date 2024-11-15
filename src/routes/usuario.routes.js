import { Router } from 'express';

import  {getUsuario, getUsuarioById} from '../controllers/usuario.controller';

const router = Router();

router.get('/usuario', getUsuario);
router.get('/usuario/:id', getUsuarioById);

export default router;