const db = require('../../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async getUser ({id = null}, req) {
    const u_id = id || req.user_id
    
    if (!req.isAuth)
      return {
        ok: false,
        message: 'unauth'
      }

    try {
      const user = await db.user.findOne({ where: { id: u_id }})
      
      if(!user)
        return {
          ok: false,
          message: 'user.find'
        }
        
      return {
        ok: true,
        user
      }
    } catch (e) {
      return {
        ok: false,
        message: 'user.find'
      }
    }
  },

  async getUsers ({}, req) {
    if (!req.isAuth)
      return {
        ok: false,
        message: 'unauth'
      }

    try {
      const users = await db.user.findAll()
      return {
        ok: true,
        users
      }
    } catch (e) {
      return {
        ok: false,
        errors: e.errors
      }
    }
  },
  
  async updateUser({id = null, fields}, req){
    const u_id = id || req.user_id
    
    if (!req.isAuth)
      return {
        ok: false,
        message: 'unauth'
      }
    
    try {
      const user = await db.user.findOne({where: {id: u_id}})
      
      if(!user)
        return {
          ok: false,
          message: 'user.find'
        }

      const updated = await user.update(fields)
      return {
        ok: true,
        user: updated,
        message: 'update'
      }
    } catch (e) {
      return {
        ok: false,
        errors: e.errors
      }
    }
  },
  
  async removeUser({id = null}, req){
    const u_id = id || req.user_id

    if (!req.isAuth)
      return {
        ok: false,
        message: 'unauth'
      }
    
    try {
      const user = await db.user.findOne({where: {id: u_id}})
      
      if(!user)
        return {
          ok: false,
          message: 'user.find'
        }
      
      const destroyed = await user.destroy()
      
      return {
        ok: true,
        message: 'user.delete'
      }
    } catch (e) {
      return {
        ok: false,
        message: 'user.delete'
      }
    }
  },
}