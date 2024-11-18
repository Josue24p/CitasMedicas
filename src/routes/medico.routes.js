import { Router } from "express";
import { getMedico, getMedicoById, crearMedico, eliminarMedico, actualizarMedico } from "../controllers/medico.controller";

const router = Router()

router.get('/medico', getMedico)
router.get('/medico/:id', getMedicoById)
router.post('/medico', crearMedico)
router.put('/medico/:id', actualizarMedico)
router.delete('/medico/:id', eliminarMedico)

export default router