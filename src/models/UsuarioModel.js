import BaseModel from "./BaseModel.js"

class UsuarioModel extends BaseModel {

    /**
     * Obtiene todos los usuarios
     * @returns array
     */
    static async getUsuarios() {
        try {
            const resultado = await UsuarioModel.ejecutarProcedimiento('sp_usuario_get')
            return resultado[0]

        } catch (error) {
            console.error('Error al obtener usuarios:', error)
            throw new Error('Error al obtener usuarios')
        }
    }

    

    //obtiene usuario segun filtros
    static async getUsuariosBy(filtros) {
        const { id=null, email=null, rol=null, activo=null } = filtros
        try {
            console.log('filtros:', filtros)

            if (!id && !email && !rol && !activo) {
                throw new Error('Al menos un filtro es requerido')
            }

            //quitar los filtro que vengan vacios
            const filterBy={}
            if(id) filterBy.id=id
            if(email) filterBy.email=email
            if(rol) filterBy.rol=rol
            if(activo) filterBy.activo=activo

            const resultado = await UsuarioModel.ejecutarProcedimiento('sp_usuario_get', filterBy)

            return resultado[0]

        } catch (error) {
            console.error(`Error al obtener usuarios por filtros: ${filtros} `, error)
            throw new Error('Error al obtener usuarios por filtros')
        }
    }

    static async createUsuario(usuario) {
        try {
            const {  rol,email, nombre_completo,password,telefono, fecha_nacimiento } = usuario
            const new_user= {
                rol,
                email,
                nombre_completo,
                password,
                telefono,
                fecha_nacimiento
            }
            console.log('new_user:', new_user)
            //validar campos requeridos
            if (!rol || !email || !nombre_completo || !password || !telefono || !fecha_nacimiento) {
                throw new Error('Los campos rol, email, nombre_completo y password son requeridos')
            }
            const resultado = await UsuarioModel.ejecutarProcedimiento('sp_usuario_create',new_user)
            return resultado[0][0]

        } catch (error) {
            console.error('Error al crear usuario:', error)
            throw new Error('Error al crear usuario')
        }
    }

    static async updateUsuario(usuario) {
        try {
            //no se puede actualizar el rol
            const { id, email, nombre_completo,password,telefono, fecha_nacimiento } = usuario
            const user= {
                id,
                email,
                nombre_completo,
                password,
                telefono,
                fecha_nacimiento
            }
            console.log('user:', user)
            //validar campos requeridos
            if (!id || !email || !nombre_completo || !password || !telefono || !fecha_nacimiento) {
                throw new Error('Los campos id, email, nombre_completo , password telefono y facha_nacimiento son requeridos')
            }
            const resultado = await UsuarioModel.ejecutarProcedimiento('sp_usuario_update',user)
            return resultado[0][0]

        } catch (error) {
            console.error('Error al actualizar usuario:', error)
            throw new Error('Error al actualizar usuario')
        }
    }
}

export default UsuarioModel