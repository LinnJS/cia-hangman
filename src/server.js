const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const expressValidator = require('express-validator')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())
app.use(express.static('public'))
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', (req, res) => {

  }

  app.listen(3000, () => {
    console.log('Listening level over level 3000!')
  })
