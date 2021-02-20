require('dotenv').config()

const enviarEmail = () => {
  const nodemailer = require('nodemailer');

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
    subject: 'Probabilidad de lluvia para Mañana',
    text: 'buenas tardes, es probable que mañana llueva, probabilidad: x%'
  };
  
  transporter.sendMail(mailOptions, (err, data) => {
    if(err){
      console.log(err)
    } else{
      console.log('email sent')
    }
  })
}

exports.enviarEmail = enviarEmail

