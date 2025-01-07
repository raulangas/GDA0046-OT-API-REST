import { Router } from "express"
import { getClientes, getClienteById, createCliente, updateCliente } from "../controllers/ClienteController.js"
import { ValidateIdParamMiddleware } from "../middleware/ValidateIdParamMiddleware.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
import ROL from "../utils/appRoles.js"


const clienteRoutes = Router()
const roles_autorizados = [ROL.OPERADOR]
// GET /clientes
// Rutas publicas
clienteRoutes.get("/", getClientes)
clienteRoutes.get("/:id", ValidateIdParamMiddleware, getClienteById)

//Rutas privadas
clienteRoutes.post("/", AuthMiddleware(roles_autorizados), createCliente)
clienteRoutes.put("/:id", AuthMiddleware(roles_autorizados), ValidateIdParamMiddleware, updateCliente)


export default clienteRoutes
