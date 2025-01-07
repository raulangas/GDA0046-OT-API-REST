import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/app.js'

export const generarToken = (payload) => {
    //filtrar datos escenciales del usuario
    const user = {
        id: payload.id,
        email: payload.email,
        rol: payload.rol
    }

    //retornar token firmado
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const verificarToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}