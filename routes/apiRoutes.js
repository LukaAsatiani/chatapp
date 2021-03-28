const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../models');

const Mailer = require('../mail/index')
const mails_list = require('../mail/list')
require('dotenv').config({path: '../.env'});

router.get('/', (req, res) => {
  res.send('Connection has been established successfully.')
})


router.post('/mail', async (req, res) => {
  const mailer = new Mailer(mails_list.password_confirmation)

  const mail = await mailer.send('drinkoron@gmail.com', {})
  
  res.json({message: 'Email was sent'})
})

router.get('/mail', (req, res) => {
  res.render(path.join(__dirname, '../views/mail', `${mails_list.password_confirmation.template}.ejs`), { name: 'Stranger' })
})

router.get('/user/:id', (req, res) => {
  db.user.findOne({ where: { id: req.params.id }})
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.json('User not found')
      };
    })
})

router.put('/user', (req, res) => {
  db.user.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(400).json('Error in insert new record');
      }
    })
})

module.exports = router