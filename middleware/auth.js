const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '2b2a970f2df8baeaa9ab9f88816508ca';
const JWT_EXPIRES_IN = '7d';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

const authorizeUser = (req, res, next) => {
  const requestedUserId = req.params.id || req.user.id;
  
  if (req.user.id !== requestedUserId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. You can only access your own resources.' 
    });
  }
  
  next();
};

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

module.exports = {
  authenticate,
  authorizeUser,
  generateToken,
  JWT_SECRET,
  JWT_EXPIRES_IN
};