const models = require('../models')
const helper = require('../../app/helpers/general')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Joi = require('@hapi/joi')

async function getAll(req, res) {
   const users = await models.user.findAll({
      attributes: { exclude: ['password'] },
   })

   return res.status(200).json({
      code: 200,
      status: 'success',
      message: 'list users',
      data: users,
   })
}

async function getDetail(req, res, next) {
   const { userId } = req.params
   const user = await models.user.findOne({
      attributes: { exclude: ['password'] },
      where: {
         id: userId,
      },
   })

   if (user === null) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'user not found',
      })
   }

   return res.status(200).json({
      code: 200,
      status: 'success',
      message: 'detail user',
      data: user,
   })
}

async function createUser(req, res) {
   const joiValidation = {
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
      name: Joi.string().min(5).required(),
      username: Joi.string().min(5).required(),
   }

   await Joi.validate(req.body, joiValidation, (err, value) => {
      if (err) {
         res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            error: err.details[0].message,
         })
      }
   })
   let { name, email, username } = req.body
   let checkEmail = await models.user.findOne({
      where: {
         email,
      },
   })
   if (checkEmail) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'email already taken',
      })
   }
   let password = await helper.hashing(req.body.password)

   try {
      const user = await models.user.create({
         name,
         email,
         username,
         password,
         created_at: new Date(),
         updated_at: new Date(),
      })
      delete user.password
      return res.status(200).json({
         code: 200,
         status: 'success',
         message: 'detail user',
         data: user,
      })
   } catch (err) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'internal server error',
         err,
      })
   }
}

async function login(req, res) {
   const joiValidation = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
   }

   await Joi.validate(req.body, joiValidation, (err, value) => {
      if (err) {
         res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            error: err.details[0].message,
         })
      }
   })
   let { email, password } = req.body
   try {
      const user = await models.user.findOne({
         where: {
            email,
         },
      })
      if (!user) {
         return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'user not found',
         })
      }
      let check = bcrypt.compareSync(password, user.password)

      if (check) {
         let token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.SECRET,
            {
               expiresIn: 86400, // expires in 24 hours
            },
         )
         return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'detail user',
            data: { user, token },
         })
      } else {
         return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'password not match',
         })
      }
   } catch (err) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'internal server error',
         err,
      })
   }
}

module.exports = {
   getAll,
   getDetail,
   createUser,
   login,
}
