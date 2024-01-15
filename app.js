const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const Record =  require('./models/Record')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connnected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    // .then(records => console.log(records))
    .then(records => res.render('index', {records}))
    .catch(error => console.log(error))
  
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})