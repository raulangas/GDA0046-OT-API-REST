// Middleware para validar que el id sea numérico y positivo
export const ValidateIdParamMiddleware = (req, res, next) => {
    const id = req.params.id
    //validacion id numerico positivo
    if (isNaN(id) || id < 1) {
        return res.status(400).json({ message: "El id debe ser un número positivo" })
    }
    next()
}