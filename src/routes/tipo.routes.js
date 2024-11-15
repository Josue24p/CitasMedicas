import { Router } from 'express';

import  {getTipo} from '../controllers/tipo.controller';

const router = Router();

router.get('/Tipo', getTipo);

export default router;