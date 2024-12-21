import BaseModel from "./BaseModel.js";

class CategoriaModel extends BaseModel {

    /**
     * Obtiene todas las categorías
     * @returns array
     */
    static async getCategorias() {
        try {
            const resultado = await CategoriaModel.ejecutarProcedimiento('sp_categoriaProducto_get')
            return resultado[0]

        } catch (error) {
            console.error('Error al obtener categorias:', error)
            throw new Error('Error al obtener categorias')
        }
    }

    /**
     * Obtiene una categoría por su id
     * @param {number} id 
     * @returns array
     */
    static async getCategoriaById(id) {
        try {

            console.log('id:', id)
            if (!id) {
                throw new Error('El id es requerido')
            }

            const resultado = await CategoriaModel.ejecutarProcedimiento('sp_categoriaProducto_get', { id })

            if (resultado[1] === 0) {
                return null
            }

            return resultado[0][0]

        } catch (error) {
            console.error(`Error al obtener categoria por id: ${id} `, error)
            throw new Error('Error al obtener categoria por id')
        }
    }

    //Obtener categorias por valor de activo
    static async getCategoriasByActivo(activo) {
        try {
            console.log('activo:', activo)

            if (activo === undefined) {
                throw new Error('El valor de activo es requerido')
            }

            const resultado = await CategoriaModel.ejecutarProcedimiento('sp_categoriaProducto_get', { activo })

            return resultado[0]
        } catch (error) {
            console.error(`Error al obtener getCategoriasByActivo: ${activo} `, error.message)
            throw new Error('Error al obtener getCategoriasByActivo')
        }
    }

    //Crear una categoria
    static async createCategoria(categoria) {
        try {
            if (!categoria) {
                throw new Error('La categoria es requerida')
            }

            const { usuario, nombre, activo } = categoria

            const new_categoria = {
                usuario,
                nombre,
                activo
            }
            //const params = `@Usuario = ${usuario}, @Nombre = '${nombre}', @Activo = ${activo}`
            const resultado = await CategoriaModel.ejecutarProcedimiento('sp_categoriaProducto_create', new_categoria)

            return resultado

        } catch (error) {
            console.error('Error al crear categoria:', error.message)
            throw new Error('Error al crear categoria')
        }
    }

    //Actualizar una categoria
    static async updateCategoria(categoria) {
        try {
            if (!categoria) {
                throw new Error('La categoria es requerida')
            }
            if (!categoria?.id) {
                throw new Error('id es requerido')
            }

            const resultado = await CategoriaModel.ejecutarProcedimiento('sp_categoriaProducto_update', categoria)

            return resultado[0][0]

        } catch (error) {
            console.error('Error al actualizar categoria:', error.message)
            throw new Error("Error al actualizar categoria")
        }
    }


}

export default CategoriaModel