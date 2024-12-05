import { Router } from "express";
import { getRegistroTurno, getRegistroTurnoById, createRegistroTurno, updateRegistroTurno, deleteRegistroTurno, getTurnosByMedico } from "../controllers/turno.controller";
const router = Router()
router.get('/turno/', getRegistroTurno)
router.get('/turno/:id', getRegistroTurnoById)
router.post('/turno/', createRegistroTurno)
router.put('/turno/:id', updateRegistroTurno)
router.delete('/turno/:id', deleteRegistroTurno)
router.get('/turno/medico/:id', getTurnosByMedico);
export default router