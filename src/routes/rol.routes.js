import { Router } from 'express';

import  {getRol} from '../controllers/rol.controller';

const router = Router();

router.get('/rol', getRol);

export default router;