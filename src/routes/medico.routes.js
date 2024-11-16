import { Router } from "express";
import { getMedico, getMedicoById, crearMedico, eliminarMedico } from "../controllers/medico.controller";

const router = Router()

router.get('/medico', getMedico)
router.get('/medico/:id_medico', getMedicoById)
router.post('/medico', crearMedico)
router.delete('/medico/:id_medico', eliminarMedico)

export default router