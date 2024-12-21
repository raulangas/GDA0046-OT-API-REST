import { hashPassword } from '../utils/HashUtil.js'
import UsuarioModel from '../models/UsuarioModel.js'

//Ruta para registro de nuevos usuarios
export const createUsuario = async (req, res) => {
    try {
        //obtener datos de interes del body
        const { email, password } = req.body

        //validar si el email ya esta registrado(unico)
        const usuario = await UsuarioModel.getUsuariosBy({ email })
        console.log('createUsuario:', usuario)
        if (usuario.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Usuario ya registrado!'
            })
        }

        //encriptar contraseña
        const password_hash = await hashPassword(password)

        const new_user = {
            ...req.body,
            password: password_hash,
        }


        //registrar usuario
        const result = await UsuarioModel.createUsuario(new_user)
        console.log('result createUsuario:', result)
        res.status(201).json(
            {
                success: true,
                message: 'Usuario creado exitosamente',
                data: result
            }
        )


    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}




//Ruta para obtener informacion del usuario logueado
export const getUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await UsuarioModel.getUsuariosBy({id})

        if (usuario.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Usuario encontrado',
            data: usuario
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const new_user = { ...req.body, id }

        const result = await UsuarioModel.updateUsuario(new_user)
        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
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