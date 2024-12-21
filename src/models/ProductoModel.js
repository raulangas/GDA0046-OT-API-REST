import BaseModel from "./BaseModel.js"

class Producto extends BaseModel {

    //Obtener productos
    static async getProductos(parametros=null) {
        try {
            const resultado = await Producto.ejecutarProcedimiento('sp_producto_get', parametros)

            const productos = resultado[0]

            const productosConImagenBase64 = productos.map((producto) => (
                {
                    ...producto,
                    imagen: producto.imagen ? producto.imagen.toString('base64') : null
                }
            ));

            return productosConImagenBase64

        } catch (error) {
            console.error('Error al obtener productos:', error)
            throw new Error("Error al obtener productos")
        }
    }

    //Obtener producto por id
    static async getProductoById(id) {
        try {
            const resultado = await Producto.ejecutarProcedimiento('sp_producto_get', { id })

            //Si no se encuentra el producto devolver null
            if (resultado[1] === 0) {
                return null
            }



            const producto = resultado[0][0]

            //verificar si el producto tiene imagen
            const productoConImagenBase64 = {
                ...producto,
                imagen: producto.imagen ? producto.imagen.toString('base64') : null
            };

            console.log('productoConImagenBase64:', productoConImagenBase64)
            return productoConImagenBase64

        } catch (error) {
            console.error('Error al obtener producto por id:', error)
            throw new Error("Error al obtener producto por id")
        }
    }

    //Crear producto
    static async createProducto(producto) {
        try {

            const { categoria, usuario, nombre, marca, codigo, stock, precio, imagen } = producto
            const parametros = {
                categoria,
                usuario,
                nombre,
                marca,
                codigo,
                stock,
                precio,
                imagen
            }

            const resultado = await Producto.ejecutarProcedimiento('sp_producto_create', parametros)

            return resultado

        } catch (error) {
            console.error('Error al crear producto:', error)
            throw new Error("Error al crear producto")
        }
    }

    static async updateProducto(producto) {
        try {

            const resultado = await Producto.ejecutarProcedimiento('sp_producto_update', producto)

            const producto_actualizado = resultado[0][0]

            const productoConImagenBase64 = {
                ...producto_actualizado,
                imagen: producto_actualizado.imagen ? producto_actualizado.imagen.toString('base64') : null
            };

            return productoConImagenBase64

        } catch (error) {
            console.error('Error al actualizar producto:', error)
            throw new Error("Error al actualizar producto")
        }
    }

}

export default Producto