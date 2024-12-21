// Middleware para validar los parámetros de paginación de las peticiones HTTP

export const PaginacionMiddleware = (req, res, next) => {

    if (req.query.page || req.query.size) {
        const page_number = parseInt(req.query.page) || 1;
        const page_size = parseInt(req.query.size) || 10;

        // Validar los parámetros
        if (page_number < 1) {
            return res.status(400).json({ message: 'El número de página debe ser mayor o igual a 1.' });
        }
        if (page_size < 1) {
            return res.status(400).json({ message: 'El tamaño de página debe ser mayor o igual a 1.' });
        }


        req.paginacion = {
            page_number,
            page_size
        }

    }


    next();
}