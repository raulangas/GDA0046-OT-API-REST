import OrdenModel from '../models/OrdenModel.js';

export const createOrden = async (req, res) => {
    try {
        const orden = req.body;
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


export const getOrdenesBy = async (req, res) => {
    try {

        const filtros = req.query;
        console.log('filtros:', filtros)

        const ordenes = await OrdenModel.getOrdenesBy(filtros);
        res.status(200).json({
            success: true,
            message: 'Lista de ordenes',
            data: ordenes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

export const processOrden = async (req, res) => {
    try {
        const id = req.params.id

        const { estado } = req.body;

        console.log('req.query', req.query)
        console.log('req.params', req.params)
        console.log('req.body', req.body)


        const result = await OrdenModel.processOrden({ id, estado });
        res.status(200).json({
            success: true,
            message: 'Orden procesada exitosamente',
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

