const cron = require('node-cron')

const prueba = () => {
  console.log('eventual aviso de lluvia')
}

// 0 20 * * * <-- todos los días a las 20 hs 
cron.schedule('* * * * * *', () => {
  prueba()
})
