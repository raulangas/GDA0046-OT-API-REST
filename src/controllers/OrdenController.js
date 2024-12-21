import OrdenModel from '../models/OrdenModel.js';

export const createOrden = async (req, res) => {
    try {
        const orden= req.body;
        const result = await OrdenModel.createOrden(orden);
        res.status(201).json({
            success: true,
            message: 'Orden creada exitosamente',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

export const updateOrden = async (req, res) => {
    try {
        const id = req.params.id;
        const new_orden = { ...req.body, id };

        const result = await OrdenModel.updateOrden(new_orden);
        res.status(200).json({
            success: true,
            message: 'Orden actualizada exitosamente',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}