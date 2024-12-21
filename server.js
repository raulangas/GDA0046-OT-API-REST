import cors from 'cors'
import express from 'express'
import sequelize from './src/config/database.js'
import usuarioRoutes from './src/routes/UsuarioRoutes.js'
import productoRoutes from './src/routes/ProductoRoutes.js'
import categoriaRoutes from './src/routes/CategoriaRoutes.js'
import authRoutes from './src/routes/AuthRoutes.js'
import estadoRoutes from './src/routes/EstadoRoutes.js'
import ordenRoutes from './src/routes/OrdenRoutes.js'
import clienteRoutes from './src/routes/ClienteRoutes.js'


import { PORT,IP_HOST, NODE_ENV, REACT_APP_HOST } from './src/config/app.js'



const app = express();

// Middlewares
console.log('NODE_ENV', NODE_ENV);
if (NODE_ENV === 'production') {
  app.use(cors({
    origin: REACT_APP_HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }));
}
else {
  app.use(cors());
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.json({
    message: 'Ping...',
    version: process.version,
    status: 'OK'
  });
});

// Rutas de productos
app.use('/api/auth', authRoutes)
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/estado', estadoRoutes);
app.use('/api/orden', ordenRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});


// Conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });


// Iniciar servidor
app.listen(PORT,IP_HOST, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
