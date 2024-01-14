const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
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