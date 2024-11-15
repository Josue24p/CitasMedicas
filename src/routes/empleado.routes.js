import { Router } from 'express';

import  {createEmpleado, getEmpleado, getEmpleadoById} from '../controllers/empleado.controller';

const router = Router();

router.get('/empleado', getEmpleado);
router.get('/empleado/:id', getEmpleadoById);
router.post('/empleado', createEmpleado);

export default router;