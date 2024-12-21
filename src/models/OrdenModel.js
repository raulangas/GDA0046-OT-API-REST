import BaseModel from "./BaseModel.js";

class OrdenModel extends BaseModel {


    static async createOrden(orden) {
        try {
            const { cliente, nombre_completo, direccion, telefono, email, fecha_entrega, json_detalle_orden } = orden
            const new_orden = {
                cliente, nombre_completo, direccion, telefono, email, fecha_entrega, json_detalle_orden
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

    static async getOrdenesBy(filtros) {
        try {

            const { cliente, estado} = filtros
            //quitar los filtro que vengan vacios
            const filterBy={}
            if(cliente) filterBy.cliente=cliente
            if(estado) filterBy.estado=estado


            const resultado = await OrdenModel.ejecutarProcedimiento('sp_orden_get', filterBy)
            return resultado[0]
        } catch (error) {
            console.error(`Error al obtener ordenes por filtros: ${filtros} `, error)
            throw new Error('Error al obtener ordenes por filtros')
        }
    }

}

export default OrdenModel