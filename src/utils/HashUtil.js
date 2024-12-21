import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(password, salt)
        return password_hash
    } catch (error) {
        console.error('Error al encriptar contraseña:', error)
        throw new Error('Error al encriptar contraseña')
    }
}