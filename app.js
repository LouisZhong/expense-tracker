const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const Record =  require('./models/Record')
const bodyParser = require('body-parser')
const helpers = require('./helpers/helpers')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: helpers}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    // .then(records => console.log(records))
    .then(records => {
      records.forEach(record => {
        record.date = record.date.toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      })
      res.render('index', {records})
    })
    .catch(error => console.log(error))
  
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.post('/records', (req, res) => {
  console.log(req.body)
  const {name, date, category, amount} = req.body
  return Record.create({name, date, category, amount})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  console.log('id', id)
  return Record.findById(id)
    .lean()
    .then((record) => {
      // console.log('record:', record)
      res.render('edit', { record })})
    .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const {name, date, category, amount} = req.body
  return Record.findById(id)
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      // console.log('cate',record.category)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      console.log('record:',record)
      record.remove()})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})