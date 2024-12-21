import dotenv from "dotenv"
dotenv.config()

export const {
    PORT = 3000,
    IP_HOST = '0.0.0.0',
    NODE_ENV = 'development',

    REACT_APP_HOST = 'http://localhost:5173',//cors

    DB_NAME='my_store',
    DB_USER='sa',
    DB_PASSWORD='Password123',
    DB_HOST='localhost',
    DB_PORT = 1433,
    DB_DIALECT = 'mssql',

    JWT_SECRET='MY_SUPER_HIPER_MEGA_SECRET@TOP_SECRET',
    JWT_EXPIRES_IN='1h',
} = process.env

