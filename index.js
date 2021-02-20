const cron = require('node-cron')

const { obtenerProbabilidades } = require('./consultarClima')

// const prueba = () => {
//   console.log('eventual aviso de lluvia')
// }

// 0 20 * * * <-- todos los días a las 20 hs 
cron.schedule('* * * * *', () => {
  obtenerProbabilidades().then( res => {
    if(res.length == 0){
      console.log('No hay probabilidades de lluvia para mañana')
    } else{
      console.log('Hay probabilidades de lluvia para mañana')
    }
  })
})
