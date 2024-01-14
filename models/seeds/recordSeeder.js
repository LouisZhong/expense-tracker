const mongoose = require('mongoose')
const Record = require('../Record') // 載入 todo model
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 1; i < 9; i++) {
    Record.create({
      name: `第${i}餐`,
      date: `2024/01/0${i}`,
      amount: `${i}`,
      category: `食物`
    })
  }
})