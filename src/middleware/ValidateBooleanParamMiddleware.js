export const ValidateBooleanParamMiddleware = (req, res, next) => {
    const activo = req.params.activo

    //activo debe ser 1 o 0 o true o false
    if (activo !== 'true' && activo !== 'false' && activo !== '1' && activo !== '0') {
        return res.status(400).json({ message: "El parámetro activo debe ser 'true' ,'false',1 o 0" })
    }

    next()
}