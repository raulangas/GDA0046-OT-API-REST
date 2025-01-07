import { Router } from "express"
import { createEstado, updateEstado , getEstados } from "../controllers/EstadoController.js"
import {AuthMiddleware} from "../middleware/AuthMiddleware.js"
import ROL from "../utils/appRoles.js"

const estadoRoutes = Router()

const roles_autorizados = [ROL.OPERADOR]

//Rutas publicas
estadoRoutes.get("/", getEstados)

 
//Rutas privadas
estadoRoutes.post("/",AuthMiddleware(roles_autorizados) ,createEstado)
estadoRoutes.put("/:id",AuthMiddleware(roles_autorizados) ,updateEstado)


export default estadoRoutes