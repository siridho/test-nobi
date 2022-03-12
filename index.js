const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { users, randomFact, transaction } = require('./app/controllers')
const auth = require('./app/helpers/auth')

const { getAll, getDetail, createUser, login } = users

const port = process.env.PORT || 3000
const app = express()
var router = express.Router()

dotenv.config() // passing data from .env file

// parse application/x-www-form-urlencoded
app.use(
   bodyParser.urlencoded({
      extended: false,
   }),
)
// parse application/json
app.use(
   bodyParser.json({
      type: 'application/json',
   }),
)
app.use(fileUpload())
// enable cors
app.use(cors())

app.get('/', async (req, res) => {
   res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Welcome to the beginning of nothingness',
   })
})

router.post('/auth/register', createUser)
router.post('/auth/login', login)

router.get('/user', auth, getAll)
router.get('/user/:userId', auth, getDetail)
router.get('/random-fact', randomFact.randomQuote)
router.post('/transaction', auth, transaction.createTransaction)

app.use('/api/v1/', router) // read routes from index.js file

const server = app.listen(port, () => {
   console.log(`Server listening on port: ${port}`)
})

module.exports = server
