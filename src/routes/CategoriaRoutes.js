import { Router } from "express"
import { getCategorias, getCategoriaById, getCategoriasByActivo, createCategoria, updateCategoria } from "../controllers/CategoriaController.js"
import { ValidateIdParamMiddleware } from "../middleware/ValidateIdParamMiddleware.js"
import { ValidateBooleanParamMiddleware } from "../middleware/ValidateBooleanParamMiddleware.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"


const categoriaRoutes = Router()
const roles_autorizados = ['Operador']
// GET /categorias
// Rutas publicas
categoriaRoutes.get("/", getCategorias)
categoriaRoutes.get("/:id", ValidateIdParamMiddleware ,getCategoriaById)
categoriaRoutes.get("/activo/:activo",ValidateBooleanParamMiddleware, getCategoriasByActivo)

//Rutas privadas
categoriaRoutes.post("/",AuthMiddleware(roles_autorizados), createCategoria)
categoriaRoutes.put("/:id",AuthMiddleware([roles_autorizados]),ValidateIdParamMiddleware, updateCategoria)


export default categoriaRoutes
