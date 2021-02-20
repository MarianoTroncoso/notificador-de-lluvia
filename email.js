require('dotenv').config()

const enviarEmail = (probs) => {
  const nodemailer = require('nodemailer');

  // seteo la fecha de mañana 
  let fecha = new Date()
  fecha.setDate(fecha.getDate() + 1)
  fecha = fecha.getDate() + '/' + (fecha.getMonth() + 1)

  let mensaje = `Existen probabilidades de lluvia para mañana: ${fecha}.\nEstas son:\n`
  probs.forEach(p => {
    mensaje = mensaje + `${p[0]}: ${p[1]}\n`
  });

  console.log(mensaje)

  // transporter
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: 'petotronco@gmail.com',
    subject: 'HAY PROBABILIDADES DE LLUVIA PARA MAÑANA',
    text: ''
  };

  // transporter.sendMail(mailOptions, (err, data) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log('email sent')
  //   }
  // })
}

exports.enviarEmail = enviarEmail

