import { Model } from "sequelize"
import sequelize from "../config/database.js"

class BaseModel extends Model {

    // Método estático para llamadas a procedimientos almacenados
    static async ejecutarProcedimiento(nombreProcedimiento, parametros = null) {
        try {
            // Construir la consulta del procedimiento almacenado
            const query = parametros
                ? `EXEC ${nombreProcedimiento} ${Object.keys(parametros).map((key) => `@${key} = ?`).join(', ')}`
                : `EXEC ${nombreProcedimiento}`;

            console.log("Query generada:", query); // Depuración
            console.log("Valores:", parametros ? Object.values(parametros) : null); // Depuración

            return await sequelize.query(query, {
                replacements: parametros ? Object.values(parametros) : null, // Array de valores
                type: sequelize.QueryTypes.RAW, // Ejecuta consulta sin mapeo adicional
            });
        } catch (error) {
            console.error(`Error al ejecutar ${nombreProcedimiento}:`, error);
            throw new Error(error);
        }

    }
}

export default BaseModel