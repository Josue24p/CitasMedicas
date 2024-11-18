import { Router } from "express";
import { getCitas, getCitasById, crearCitas, actualizarCitas, eliminarCitas } from "../controllers/citas.controller";

const router = Router()

router.get('/citas/', getCitas)
router.get('/citas/:id', getCitasById)
router.post('/citas/', crearCitas)
router.put('/citas/:id', actualizarCitas)
router.delete('/citas/:id', eliminarCitas)

export default router