import { Router } from "express"
import { getProductos, createProducto, getProductoById, updateProducto } from "../controllers/ProductoController.js"
import { ImageUploaderMiddleware } from "../middleware/ImageUploaderMiddleware.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
import { ValidateIdParamMiddleware } from "../middleware/ValidateIdParamMiddleware.js"
import { PaginacionMiddleware } from "../middleware/PaginacionMiddleware.js"

const productoRoutes = Router()
const roles_autorizados = ['Operador']

// GET /products
// Rutas publicas
productoRoutes.get("/",PaginacionMiddleware, getProductos)
productoRoutes.get("/:id", getProductoById)

//Rutas privadas
productoRoutes.post("/", AuthMiddleware(roles_autorizados), ImageUploaderMiddleware.single('imagen'), createProducto)
productoRoutes.put("/:id", AuthMiddleware(roles_autorizados), ValidateIdParamMiddleware, ImageUploaderMiddleware.single('imagen'), updateProducto)

export default productoRoutes
