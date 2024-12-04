import { Router } from "express";
import { login, logout, profile, signUp } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/authJwt";
import {verificarCorreo} from "../middlewares/verificarRegistro"

const router = Router();

router.post('/signup', verificarCorreo, signUp)
router.post('/signin', login)
router.post('/logout', logout)
router.get('/profile', verifyToken, profile)

export default router;