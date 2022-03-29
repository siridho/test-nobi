const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
   try {
      const {
         headers: { authorization },
      } = req
      if (!authorization) {
         throw new Error('')
      }
      const token = authorization.split(' ')[1]
      console.log(token)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const { id } = decodedToken
      if (!id) {
         throw new Error('')
      } else {
         next()
      }
   } catch (err) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'Unauthorized',
      })
   }

   try {
      const { authorization } = req.headers

      if (!authorization) {
         throw new ErrorHandler(401, 'User is not unathorized')
      }

      if (!authorization.startsWith('Bearer')) {
         throw new ErrorHandler(401, 'User is not unathorized')
      }

      const split = authorization.split('Bearer ')
      if (split.length !== 2) {
         throw new ErrorHandler(401, 'User is not unathorized')
      }

      const token = authorization.split(' ')[1]
      console.log(token)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const { id } = decodedToken
      res.setHeader('email', decodedToken.email)
      if (!id) {
         throw new ErrorHandler(401, 'User is not unathorized')
      } else {
         next()
      }
      next()
   } catch (error) {
      console.log('END')
      next(error)
   }
}
