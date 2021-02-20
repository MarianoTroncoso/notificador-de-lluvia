const cron = require('node-cron')

const prueba = () => {
  console.log('hola')
}

cron.schedule('* * * * * *', () => {
  prueba()
})
