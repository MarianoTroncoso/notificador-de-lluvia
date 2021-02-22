require('dotenv').config()

const enviarEmail = (probs) => {
  const nodemailer = require('nodemailer');

  // seteo la fecha de mañana 
  let fecha = new Date()
  fecha.setDate(fecha.getDate() + 1)
  fecha = fecha.getDate() + '/' + (fecha.getMonth() + 1)

  // inicio del mensaje
  let mensaje = `Existen probabilidades de lluvia para mañana: ${fecha}.\nEstas son:\n`
  probs.forEach(p => {
    mensaje = mensaje + `${p[0]}: ${p[1]}\n`
  });

  // transporter
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.EMAILFROM,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
  }
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
  })
}

exports.enviarEmail = enviarEmail

