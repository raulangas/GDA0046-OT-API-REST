import BaseModel from "./BaseModel.js";

class OrdenModel extends BaseModel {


    static async createOrden(orden) {
        try {
            const { usuario, nombre_completo, direccion, telefono, email, fecha_entrega, json_detalle_orden } = orden
            const new_orden = {
                usuario, nombre_completo, direccion, telefono, email, fecha_entrega, json_detalle_orden
            }

            const resultado = await OrdenModel.ejecutarProcedimiento('sp_orden_create', new_orden)
            return resultado[0][0]
        } catch (error) {
            console.error('Error al crear orden:', error)
            throw new Error('Error al crear orden')
        }
    }

    static async updateOrden(orden) {
        try {
            const { id, nombre_completo, direccion, telefono, email, fecha_entrega } = orden
            const new_orden = {
                id, nombre_completo, direccion, telefono, email, fecha_entrega
            }

            const resultado = await OrdenModel.ejecutarProcedimiento('sp_orden_update', new_orden)
            return resultado[0][0]
        } catch (error) {
            console.error('Error al actualizar orden:', error)
            throw new Error('Error al actualizar orden')
        }
    }

    static async getOrdenesBy({ usuario, estado }) {
        try {

            //quitar los filtro que vengan vacios
            const filterBy = {}
            if (usuario) filterBy.usuario = usuario
            //verificar si estado es indefinido
            if (estado !== undefined) filterBy.estado = estado
            //verificar si estado es cadena vacia
            if (estado === '') filterBy.estado = null

            const resultado = await OrdenModel.ejecutarProcedimiento('sp_orden_get', filterBy)
            return resultado[0]
        } catch (error) {
            console.error(`Error al obtener ordenes por filtros: ${filtros} `, error)
            throw new Error('Error al obtener ordenes por filtros')
        }
    }

    static async processOrden({ id, estado }) {
        try {

            const resultado = await OrdenModel.ejecutarProcedimiento('sp_orden_process', { id, estado })
            return resultado[0][0]
        } catch (error) {
            console.error('Error al procesar orden:', error)
            throw new Error('Error al procesar orden')
        }
    }

}

export default OrdenModel