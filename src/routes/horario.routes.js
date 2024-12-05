import { Router } from 'express';

import  {getHorario, getHorariosByTurno} from '../controllers/horario.controller';

const router = Router();

router.get('/horario', getHorario);
router.get('/horario/turno/:id', getHorariosByTurno);
export default router;