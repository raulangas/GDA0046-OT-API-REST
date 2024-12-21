import CategoriaModel from "../models/CategoriaModel.js"

export const getCategorias = async (req, res) => {
    try {
        const categories = await CategoriaModel.getCategorias()
        res.status(200).json({
            success: true,
            message: 'Lista de categorias',
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

export const getCategoriaById = async (req, res) => {
    const id = req.params.id
    try {
        const category = await CategoriaModel.getCategoriaById(id)
        res.status(200).json({
            success: true,
            message: 'Categoria encontrada',
            data: category
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }

}

export const getCategoriasByActivo = async (req, res) => {
    const activo = req.params.activo
    try {
        const categories = await CategoriaModel.getCategoriasByActivo(activo)
        res.status(200).json({
            success: true,
            message: 'Lista de categorias',
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}


export const createCategoria = async (req, res) => {
    try {
        const categoria = req.body
        const result = await CategoriaModel.createCategoria(categoria)
        res.status(201).json({
            success: true,
            message: 'Categoria creada exitosamente',
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

export const updateCategoria = async (req, res) => {
    try {
        const id = req.params.id
        const categoria= req.body
        const new_categoria = { 
            id,
            nombre: categoria.nombre,
            activo: categoria.activo
        }

        const result = await CategoriaModel.updateCategoria(new_categoria)
        res.status(200).json({
            success: true,
            message: 'Categoria actualizada exitosamente',
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
