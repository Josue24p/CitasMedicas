import { Router } from "express";
import { login, logout, profile, signUp } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/authJwt";

const router = Router();

router.post('/signup', signUp)
router.post('/signin', login)
router.post('/logout', logout)
router.get('/profile', verifyToken, profile)

export default router;