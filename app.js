const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send(`This is my first Express Web App`)
})

app.listen(port, () => {
  console.log(`This is my first Express Web App started by nodemon`)
})