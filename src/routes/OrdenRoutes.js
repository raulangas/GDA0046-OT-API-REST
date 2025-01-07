import { Router } from "express"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
import { createOrden, getOrdenesBy, updateOrden, processOrden } from "../controllers/OrdenController.js"
import ROL from "../utils/appRoles.js"

const ordenRoutes = Router()

const roles_autorizados = [ROL.CLIENTE, ROL.OPERADOR]

//Rutas publicas

//Rutas privadas

ordenRoutes.get("/", AuthMiddleware(roles_autorizados), getOrdenesBy)
ordenRoutes.post("/", AuthMiddleware(roles_autorizados), createOrden)
ordenRoutes.put("/:id", AuthMiddleware(roles_autorizados), updateOrden)
ordenRoutes.put("/procesar/:id", AuthMiddleware(roles_autorizados), processOrden)

export default ordenRoutes