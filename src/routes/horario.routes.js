import { Router } from 'express';

import  {getHorario} from '../controllers/horario.controller';

const router = Router();

router.get('/horario', getHorario);

export default router;