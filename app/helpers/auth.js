const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
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
}
