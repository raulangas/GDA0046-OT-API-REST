import bcrypt from 'bcryptjs'
import { generarToken } from '../utils/JwtUtil.js'
import UsuarioModel from '../models/UsuarioModel.js'

//Ruta para hacer login de usuarios
export const loginAuth = async (req, res) => {
    try {
        //obtener datos de interes del body
        const { email, password } = req.body

        //validar si el email ya esta registrado(unico)
        const usuario = await UsuarioModel.getUsuariosBy({ email })
        console.log('getUsuariosBy:', usuario)
        if (usuario.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Usuario no registrado!'
            })
        }

        //validar contraseña
        const password_match = await bcrypt.compare(password, usuario[0].password)
        if (!password_match) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña incorrecta!'
            })
        }

        //generar token
        const token = generarToken(usuario[0])

        res.status(200).json({
            success: true,
            message: 'Usuario logueado exitosamente',
            data: token
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





