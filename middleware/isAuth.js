const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  
  const authHeader = req.get('Authorization');
  
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  
  let decodedToken;
  
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findOne({ where: { id: decodedToken.user_id }});
    
    if (!decodedToken || !user) {
      req.isAuth = false;
      return next();
    }
    
    if(user.logout_count !== decodedToken.logout_count){
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.user_id = decodedToken.user_id;

    next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }

};