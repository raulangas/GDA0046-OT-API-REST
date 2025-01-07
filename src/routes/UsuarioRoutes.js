import { Router } from "express"
import { createUsuario, getUsuario, getUsuarios, updateUsuario } from "../controllers/UsuarioController.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
import ROL from "../utils/appRoles.js"

const usuarioRoutes = Router()

const roles_autorizados = [ROL.CLIENTE, ROL.OPERADOR]
//Rutas publicas


//Rutas privadas
//ruta para registrar nuevo usuario
usuarioRoutes.post("/",AuthMiddleware(roles_autorizados), createUsuario)

//ruta para obtener informacion del usuario logueado, por medio del token de autenticacion
usuarioRoutes.get("/", AuthMiddleware(roles_autorizados), getUsuarios)
usuarioRoutes.get("/:id", AuthMiddleware(roles_autorizados), getUsuario)

usuarioRoutes.put("/:id", AuthMiddleware(roles_autorizados), updateUsuario)



export default usuarioRoutes