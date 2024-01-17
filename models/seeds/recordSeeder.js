const Record = require('../record') // 載入 todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 1; i < 9; i++) {
    Record.create({
      name: `第${i}餐`,
      date: `2024/01/0${i}`,
      amount: `${i}`,
      category: `食物`
    })
  }
  console.log('done')
})