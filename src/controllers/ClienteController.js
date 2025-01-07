import ClienteModel from '../models/ClienteModel.js'

export const getClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.getClientes()
        res.status(200).json({
            success: true,
            message: 'Lista de clientes',
            data: clientes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

export const getClienteById = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await ClienteModel.getClienteById(id)

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: 'Cliente no encontrado'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Cliente encontrado',
            data: cliente
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


export const createCliente = async (req, res) => {
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body
    try {
        const new_cliente = {
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            email
        }

        const result = await ClienteModel.createCliente(new_cliente)
        res.status(201).json({
            success: true,
            message: 'Cliente creado',
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



export const updateCliente = async (req, res) => {
    try {
        const id = req.params.id
        const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body

        const new_cliente = {
            id,
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            email,
        }

        const result = await ClienteModel.updateCliente(new_cliente)
        res.status(200).json({
            success: true,
            message: 'Cliente actualizado',
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