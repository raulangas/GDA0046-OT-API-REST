import { Router } from "express";
import { loginAuth } from "../controllers/AuthController.js";
const authRoutes= Router();

//Rutas publicas

//Ruta para login
authRoutes.post("/", loginAuth)

export default authRoutes;