const cron = require('node-cron')

const { obtenerProbabilidades } = require('./consultarClima')
const { enviarEmail } = require('./email')

// 0 20 * * * <-- todos los días a las 20 hs 
cron.schedule('* * * * *', () => {
  obtenerProbabilidades().then( res => {
    
    if(res.length != 0){
      console.log('Hay probabilidades de lluvia para mañana')
      enviarEmail(res)
    } else{
      console.log('No hay probabilidades de lluvia para mañana')
      // envio email de todo esta bien
      // enviarEmail()
    }
  })
})
