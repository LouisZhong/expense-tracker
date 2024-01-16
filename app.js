const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')

const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})