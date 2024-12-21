import BaseModel from "./BaseModel.js";

class ClienteModel extends BaseModel {

    /**
    * Obtiene todos los clientes
    * @returns array
    */
    static async getClientes() {
        try {
            const resultado = await ClienteModel.ejecutarProcedimiento('sp_cliente_get')
            return resultado[0]

        } catch (error) {
            console.error('Error al obtener clientes:', error)
            throw new Error('Error al obtener clientes')
        }
    }

    /**
     * Obtiene un cliente por su id
     * @param {number} id
     * @returns array
     */

    static async getClienteById(id) {
        try {

            console.log('id:', id)
            if (!id) {
                throw new Error('El id es requerido')
            }

            const resultado = await ClienteModel.ejecutarProcedimiento('sp_cliente_get', { id })

            if (resultado[1] === 0) {
                return null
            }

            return resultado[0][0]

        } catch (error) {
            console.error(`Error al obtener cliente por id: ${id} `, error)
            throw new Error('Error al obtener cliente por id')
        }
    }

    //Actualizar cliente
    static async updateCliente(cliente) {
        try {
            console.log('cliente:', cliente)

            if (!cliente) {
                throw new Error('El cliente es requerido')
            }

            const resultado = await ClienteModel.ejecutarProcedimiento('sp_cliente_update', cliente)

            return resultado[0]
        } catch (error) {
            console.error(`Error al actualizar cliente: ${cliente} `, error.message)
            throw new Error('Error al actualizar cliente')
        }
    }


    //Crear cliente
    static async createCliente(cliente) {
        try {
            console.log('cliente:', cliente)

            if (!cliente) {
                throw new Error('El cliente es requerido')
            }

            const resultado = await ClienteModel.ejecutarProcedimiento('sp_cliente_create', cliente)

            return resultado[0]
        } catch (error) {
            console.error(`Error al crear cliente: ${cliente} `, error.message)
            throw new Error('Error al crear cliente')
        }
    }

}

export default ClienteModel