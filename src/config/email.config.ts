import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
  host:'sandbox.smtp.mailtrap.io',
  port:2525,
  auth: {
    user:'e9de350c8dea2f',
    pass:'d3022fbd61e6e1' ,
  },
});

export {transporter}