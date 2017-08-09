const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const fs = require('fs')
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())
app.use(express.static('public'))
app.use(expressSession({secret: 'max', saveUninitialized: true, resave: false}))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

let wordGen = function() {
  let i = Math.floor(Math.random() * words.length)
  return words[i]
}

const mystery = word => {
  return word.split('').map(letter => {
    return (letter = '  ___  ')
  }).join('')
}

let gussesLeft = 8
let lettersGuessed = []
let word = wordGen()
game.mysteryWord = mystery(word)

app.get('/', (req, res) => {
  game = req.session
  game.gameWord = word
  console.log(req.session.gameWord)
  res.render('home', game)
})

app.post('/guess', (req, res) => {
  game = req.session
  game.guessedLetter = req.body.letter
  lettersGuessed.push(game.guessedLetter)
  console.log(lettersGuessed)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Listening level over level 3000!')
})

// Have gusses registered
// Have guess right registered
