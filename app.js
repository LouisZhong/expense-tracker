const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')

const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('./helpers/helpers')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: helpers}))
app.set('view engine', 'hbs')



app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})