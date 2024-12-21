import { verificarToken } from '../utils/JwtUtil.js';

export const AuthMiddleware = (roles_autorizados) => (req, res, next) => {

  try {


    const token_jwt = req.headers.authorization;
    if (!token_jwt) return res.status(401).json({
      success: false,
      message: 'No autenticado!, token no proporcionado'
    });

    const token = token_jwt.split(' ')[1];
    const user = verificarToken(token);


    if (!user) return res.status(401).json({
      success: false,
      message: 'No autenticado!'
    });

    if (!roles_autorizados.includes(user.rol)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso no autorizado!'
      });
    }

    req.user = user;


    next();

  } catch (error) {

    //verificar error de expiracion de token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado!'
      });
    }

    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};
