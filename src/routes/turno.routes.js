import { Router } from "express";
import { getRegistroTurno, getRegistroTurnoById, createRegistroTurno, updateRegistroTurno, deleteRegistroTurno } from "../controllers/turno.controller";
const router = Router()
router.get('/turno/', getRegistroTurno)
router.get('/turno/:id', getRegistroTurnoById)
router.post('/turno/', createRegistroTurno)
router.put('/turno/:id', updateRegistroTurno)
router.delete('/turno/:id', deleteRegistroTurno)
export default router