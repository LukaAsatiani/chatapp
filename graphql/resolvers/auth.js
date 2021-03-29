const db = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  login: async ({ email, password }) => {
    try {
      const user = await db.user.findOne({where: { email: email }});
      
      if(!user)
        return {
          ok: false,
          message: 'user.find'
        }

      const isEqual = await bcrypt.compare(password, user.password);
      
      if (isEqual) {
        const token = jwt.sign(
          { email: user.email, logout_count: user.logout_count, user_id: user.id },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        );
        
        return {
          ok: true,
          token: {
            user_id: user.id,
            value: token
          }
        };
      }
      return {
        ok: false,
        message: 'user.auth'
      }
    } catch (e) {
      return {
        ok: false,
        message: 'user.auth'
      }
    }
  },

  async createUser({fields}){
    if(fields.password.length < 8){
      return {
        ok: false,
        errors: [
          {
            path: "password",
            validatorKey: "len"
          }
        ]
      }
    }
    
    try {
      const hashedPassword = await bcrypt.hash(fields.password, 12);
      const new_user = await db.user.create({ ...fields, password: hashedPassword, logout_count: 0})
      
      const token = jwt.sign(
        { email: new_user.email, logout_count: 0, user_id: new_user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      );
      
      return {
        ok: true,
        token: {
          user_id: new_user.id,
          value: token
        },
        user: new_user
      }
    } catch (e) {
      return {
        ok: false,
        errors: e.errors
      }
    }
  },

  async logout({}, req){
    if (!req.isAuth)
      return {
        ok: false,
        message: 'unauth'
      }
      
    const user = await db.user.findOne({where: {id: req.user_id}});

    if(!user)
      return {
        ok: false,
        message: 'user.logout'
      }
    
    const new_user = await user.update({logout_count: user.logout_count + 1});
    
    return {
      ok: true,
      message: 'user.logout'
    }
  }
}