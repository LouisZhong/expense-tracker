const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

// router.get('/edit', (req, res) => {
//   res.render('edit')
// })

router.post('/', (req, res) => {
  console.log(req.body)
  const userId = req.user._id
  const {name, date, category, amount} = req.body
  return Record.create({name, date, category, amount, userId})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  console.log('id', _id)
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      // console.log('record:', record)
      res.render('edit', { record })})
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const {name, date, category, amount} = req.body
  return Record.findOne({ _id, userId})
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

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then((record) => {
      console.log('record:',record)
      record.remove()})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router