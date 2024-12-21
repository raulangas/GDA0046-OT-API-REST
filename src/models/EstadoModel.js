import BaseModel from "./BaseModel.js";

class EstadoModel extends BaseModel {


    static async getEstados() {
        try {
            const resultado = await EstadoModel.ejecutarProcedimiento('sp_estado_get')
            return resultado[0]

        } catch (error) {
            console.error('Error al obtener estados:', error)
            throw new Error('Error al obtener estados')
        }
    }

    static async createEstado({ nombre}) {
        try {
            if (!nombre) {
                throw new Error('El nombre es requerido')
            }

            const resultado = await EstadoModel.ejecutarProcedimiento('sp_estado_create', { nombre })

            return resultado

        } catch (error) {
            console.error('Error al crear estado:', error.message)
            throw new Error('Error al crear estado')
        }
    }

    static async updateEstado(estado) {
        try {
            if (!estado) {
                throw new Error('El estado es requerido')
            }

            const { id, nombre } = estado
            if (!estado?.id || !estado?.nombre) {
                throw new Error('id y nombre es requerido')
            }

            const resultado = await EstadoModel.ejecutarProcedimiento('sp_estado_update', { id, nombre })

            return resultado[0][0]

        } catch (error) {
            console.error('Error al actualizar estado:', error.message)
            throw new Error("Error al actualizar estado")
        }
    }
}

export default EstadoModel