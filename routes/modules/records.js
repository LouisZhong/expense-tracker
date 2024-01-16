const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new')
})

// router.get('/edit', (req, res) => {
//   res.render('edit')
// })

router.post('/', (req, res) => {
  console.log(req.body)
  const {name, date, category, amount} = req.body
  return Record.create({name, date, category, amount})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  console.log('id', id)
  return Record.findById(id)
    .lean()
    .then((record) => {
      // console.log('record:', record)
      res.render('edit', { record })})
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      console.log('record:',record)
      record.remove()})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router