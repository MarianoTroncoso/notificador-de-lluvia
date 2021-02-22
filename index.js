const cron = require('node-cron');
const express = require('express');

const { obtenerProbabilidades } = require('./consultarClima')
const { enviarEmail } = require('./email')

app = express();

// CAMBIAR
// 0 20 * * * <-- todos los días a las 20 hs 
// cron.schedule('0 20 * * *', () => {
cron.schedule('* * * * *', () => {
  obtenerProbabilidades().then( res => {
    
    if(res.length != 0){
      // console.log('Hay probabilidades de lluvia para mañana')
      enviarEmail(res)
    } else{
      // console.log('No hay probabilidades de lluvia para mañana')
    }
  })
})

app.listen(process.env.PORT);
