import EstadoModel from "../models/EstadoModel.js"

export const createEstado = async (req, res) => {
    try {
        const { estado } = req.body
        const result = await EstadoModel.createEstado(estado)
        res.status(201).json({
            success: true,
            message: 'Estado creado exitosamente',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

export const updateEstado = async (req, res) => {
    try {
        const id = req.params.id
        const new_estado = { ...req.body, id }

        const result = await EstadoModel.updateEstado(new_estado)
        res.status(200).json({
            success: true,
            message: 'Estado actualizado exitosamente',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }

}

export const getEstados = async (req, res) => {
    try {
        const result = await EstadoModel.getEstados()
        res.status(200).json({
            success: true,
            message: 'Estados obtenidos exitosamente',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}