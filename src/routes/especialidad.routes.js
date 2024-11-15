import { Router } from 'express';

import  {getEspecialidad} from '../controllers/especialidad.controller';

const router = Router();

router.get('/especialidades', getEspecialidad);

export default router;