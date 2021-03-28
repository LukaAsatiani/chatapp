const nodemailer = require('nodemailer');
const path = require('path')
const ejs = require("ejs");

require('dotenv').config({path: '../.env'});

class Mailer {
  constructor ({subject, template}) {
    this.subject = subject;
    this.template = template;
    this.auth();
  }

  auth () {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  send (to, params) {
    ejs.renderFile(path.join(__dirname, '../views/mail', `${this.template}.ejs`), { name: 'Stranger' }, (err, data) => {
      this.transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        subject: this.subject,
        to,
        html: data
      }, function(error, info){
        if (error) {
          return {
            status: false,
            error: error
          }
        } else {
          return {
            status: true,
            message: 'Email was sent.'
          }
        }
      })
    })
  }
}

module.exports = Mailer
