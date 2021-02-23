const nodemailer = require('nodemailer');
const { google } = require('googleapis')
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const enviarEmail = async (probs) => {

  // seteo la fecha de mañana 
  let fecha = new Date()
  fecha.setDate(fecha.getDate() + 1)
  fecha = fecha.getDate() + '/' + (fecha.getMonth() + 1)

  // inicio del mensaje
  let mensaje = `Existen probabilidades de lluvia para mañana: ${fecha}.\nEstas son:\n`
  probs.forEach(p => {
    mensaje = mensaje + `${p[0]}: ${p[1]}\n`
  });

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
  oAuth2Client.setCredentials( { refresh_token: REFRESH_TOKEN})


  const accessToken = await oAuth2Client.getAccessToken()

  // transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAILFROM,
      // pass: process.env.PASSWORD,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    },
    //   tls: {
    //     rejectUnauthorized: false
    // }
  });

  let mailOptions = {
    from: process.env.EMAILFROM,
    to: 'petotronco@gmail.com',
    subject: 'HAY PROBABILIDADES DE LLUVIA PARA MAÑANA',
    text: mensaje
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('email sent')
    }
    // try {
      
    // } catch (error) {
    //   return error  
    // }
  })
}

exports.enviarEmail = enviarEmail

