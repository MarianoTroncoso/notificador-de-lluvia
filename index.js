const cron = require('node-cron');

const { obtenerProbabilidades } = require('./consultarClima')
const { enviarEmail } = require('./email')

// 0 20 * * * <-- todos los días a las 20 hs 
cron.schedule('0 20 * * *', () => {
// cron.schedule('* * * * *', () => {
  obtenerProbabilidades().then( res => {
    
    if(res.length != 0){
      enviarEmail(res)
    }
  })
})
