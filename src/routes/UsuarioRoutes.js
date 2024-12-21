import { Router } from "express"
import { createUsuario, getUsuario, updateUsuario } from "../controllers/UsuarioController.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"

const usuarioRoutes = Router()

const roles_autorizados = ['Cliente', 'Operador']
//Rutas publicas
//ruta para registrar nuevo usuario
usuarioRoutes.post("/", createUsuario)


//Rutas privadas
//ruta para obtener informacion del usuario logueado, por medio del token de autenticacion
usuarioRoutes.get("/:id", AuthMiddleware(roles_autorizados), getUsuario)

usuarioRoutes.put("/:id", AuthMiddleware(roles_autorizados), updateUsuario)



export default usuarioRoutes