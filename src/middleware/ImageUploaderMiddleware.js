import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname, '../../uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            // Si no existe el directorio, se crea
            fs.mkdirSync(uploadDir)
        }

        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        // Nombre de archivo único para cada imagen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
})

export const ImageUploaderMiddleware = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 } // 1MB
    , fileFilter: (req, file, cb) => {
        // extensiones permitidas
        const filetypes = /jpeg|jpg|png|webp/
        const mimetype = filetypes.test(file.mimetype)

        console.log(file.originalname)
        console.log(mimetype)

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: Archivo debe ser una imagen válida")
    }

})

