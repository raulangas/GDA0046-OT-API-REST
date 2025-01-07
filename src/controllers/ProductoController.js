import Producto from "../models/ProductoModel.js"
//importar file system para manejar archivos promesas
import { promises as fs } from 'fs'


export const getProductos = async (req, res) => {
    try {
        //verifica si vienen parametros de paginación
        if (req.paginacion) {
            const paginacion = req.paginacion
            const { page_number, page_size } = paginacion

            const products = await Producto.getProductos(paginacion)

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontraron productos.'
                }
                );
            }

            const { Total_records, Total_pages } = products[0];


            return res.json({
                success: true,
                message: 'Lista de productos',
                data: products.map(({ Total_records, Total_pages, ...item }) => item)
                ,
                meta: {
                    total_records: Total_records,
                    total_pages: Total_pages,
                    page_number,
                    page_size
                }
            })
        }




        const products = await Producto.getProductos()
        res.json({
            success: true,
            message: 'Lista de productos',
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

export const getProductoById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Producto.getProductoById(id)
        res.status(200).json({
            success: true,
            message: 'Producto encontrado',
            data: product
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message,
        })
    }
}

export const createProducto = async (req, res) => {
    const producto = req.body
    try {
        const imagen_path = req.file ? req.file.path : null

        const imagen = imagen_path ? await fs.readFile(imagen_path) : null
        producto.imagen = imagen



        const result = await Producto.createProducto(producto)

        //borrar archivo
        if (imagen_path) {
            console.log('Archivo para eliminar:', imagen_path);
            await fs.unlink(imagen_path)
        }

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}

export const updateProducto = async (req, res) => {
    try {
        const id = req.params.id
        const producto = { ...req.body, id }


        const new_producto = {
            id: producto.id,
            categoria: producto.categoria,
            usuario: producto.usuario,
            nombre: producto.nombre,
            marca: producto.marca,
            codigo: producto.codigo,
            stock: producto.stock,
            precio: producto.precio,
            activo: producto.activo
        }
        const imagen_path = req.file ? req.file.path : null


        if (imagen_path) {
            console.log('Imagen:', imagen_path);
            //actualizar imagen si se recibe
            const imagenBuffer = imagen_path ? await fs.readFile(imagen_path) : null
            new_producto.imagen = imagenBuffer
        }


        const result = await Producto.updateProducto(new_producto)

        //borrar archivo
        if (imagen_path) {
            console.log('Archivo para eliminar:', imagen_path);
            await fs.unlink(imagen_path)
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        })
    }
}


