import { Router } from "express"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
import { createOrden, updateOrden } from "../controllers/OrdenController.js"

const ordenRoutes = Router()

const roles_autorizados = ['Cliente']

//Rutas publicas

//Rutas privadas
ordenRoutes.post("/",AuthMiddleware([roles_autorizados]) ,createOrden)
ordenRoutes.put("/:id",AuthMiddleware([roles_autorizados]) ,updateOrden)

export default ordenRoutes