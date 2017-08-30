const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const fs = require('fs')
const words = fs
  .readFileSync('./words.js', 'utf-8')
  .toLowerCase()
  .split('\n')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(express.static('public'))
app.use(expressSession({ secret: 'max', saveUninitialized: true, resave: false }))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.on('error', (res, req) => {
  res.render('error')
})

let wordGen = function() {
  let i = Math.floor(Math.random() * words.length)
  return words[i]
}

app.get('/', (req, res) => {
  game = req.session
  if (!game.word || game.guessesLeft <= 0) {
    game.word = wordGen()
    game.guessesLeft = 8
    game.lettersGuessed = []
    game.mysteryWord = Array(game.word.length).fill('*')
  }
  console.log('WORD: ' + req.session.word)
  res.render('home', game)
})
app.get('/guess', (req, res) => {
  res.redirect('/')
})
app.post('/guess', (req, res) => {
  const game = req.session
  let guessedLetter = req.body.letter
  if (!game.word) {
    res.redirect('/')
  }

  if (game.lettersGuessed.includes(guessedLetter)) {
    game.message = ` ERROR DUPLICATE INPUT "${guessedLetter}"`
    console.log(game.message)
  } else {
    game.message = ' '
    game.lettersGuessed.push(guessedLetter)
  }
  game.mysteryWord = game.word.split('').map(letter => {
    if (game.lettersGuessed.includes(letter)) {
      return letter
    } else {
      return ' * '
    }
  })
  console.log(game.mysteryWord, guessedLetter)

  if (!game.mysteryWord.includes(guessedLetter) && !game.mysteryWord.includes(guessedLetter)) {
    game.guessesLeft -= 1
  }

  if (game.mysteryWord.join('') === game.word) {
    res.render('win', { word: game.word })
    return
  }

  if (game.guessesLeft <= 0) {
    res.render('lose', { word: game.word })
    return
  }

  console.log(game.lettersGuessed)
  console.log(game.guessesLeft)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Listening level over level 3000!')
})
