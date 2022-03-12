const models = require('../models')
const Joi = require('@hapi/joi')
const fixedNotRounding = require('../helpers/fixedNotRouding')

async function createTransaction(req, res) {
   const joiValidation = {
      trx_id: Joi.string().max(255).required(),
      amount: Joi.required(),
      user_id: Joi.number().integer().min(1).required(),
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
   let { trx_id, amount, user_id } = req.body
   let t
   let err = ''

   if (Number(amount) === 0.000000001) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'transaction declined',
         err: 'bad user input',
      })
   }
   setTimeout(async () => {
      try {
         t = await models.sequelize.transaction()
         let transaction = null

         const selectedBalance = await models.balance.findOne({
            where: { user_id },
            transaction: t,
         })

         if (!selectedBalance || selectedBalance.amount_available < amount) {
            err = 'insufficient balance'
            throw new Error(err)
         }
         console.log('passed')

         transaction = await models.transaction.create(
            {
               trx_id,
               amount,
               user_id,
               created_at: new Date(),
               updated_at: new Date(),
            },
            { transaction: t },
         )

         await models.sequelize.query(
            `update balances set amount_available=amount_available-${Number(
               amount,
            )} where user_id=${user_id}`,
            {
               transaction: t,
            },
         )

         selectedBalance.amount_available -= Number(amount)

         await t.commit()
         console.log(selectedBalance.amount_available)
         return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'create transaction',
            data: {
               transaction,
               amount_available: fixedNotRounding(
                  selectedBalance.amount_available,
               ),
            },
         })
      } catch (error) {
         if (t) await t.rollback()
         return res.status(400).json({
            code: 400,
            status: 'error',
            message: 'internal server error',
            err: err || error,
         })
      }
   }, 30000)
}

module.exports = { createTransaction }
