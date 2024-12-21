import { Sequelize } from "sequelize"
import { NODE_ENV, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } from "./app.js"


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    logging: NODE_ENV !== 'production' ? false : console.log,
})

export default sequelize