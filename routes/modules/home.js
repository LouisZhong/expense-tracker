const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
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
module.exports = router