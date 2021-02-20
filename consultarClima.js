const puppeteer = require('puppeteer');

const obtenerProbabilidades = async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.smn.gob.ar/');

  // buscar ciudad Resistencia 
  await page.type('[id="js-container"] input', 'resistencia')
  await page.waitForSelector('[data-index="1"]')
  await page.click('[data-index="1"]')
  await page.waitForSelector('.typeahead__button')
  await page.click('.typeahead__button')

  // buscar el día de mañana 
  await page.waitForSelector('#pronos_dia1')
  await page.click('#pronos_dia1')

  // guardo las probabilidades de lluvia
  const probabilidades = await page.evaluate(()=>{
    const tmp = {};
    tmp.madrugada = document.querySelector('#pronos_rain_prob_earlymorning1').innerText;
    tmp.mañana = document.querySelector('#pronos_rain_prob_morning1').innerText;
    tmp.tarde = document.querySelector('#pronos_rain_prob_afternoon1').innerText;
    tmp.noche = document.querySelector('#pronos_rain_prob_night1').innerText;
    return tmp
  });

  // fake 
  // const probabilidades = {
  //   madrugada: '40 - 70%',
  //   mañana: '40 - 70%',
  //   tarde: '40 - 70%',
  //   noche: '40 - 70%'
  // }
  
  let lluvia = [];
  const probabilidadesBajas = ['0%', '0 - 10%','10 - 40%']
  for(const p in probabilidades){
    if(!probabilidadesBajas.includes(probabilidades[p])){
      lluvia.push([p, probabilidades[p]])
    }
  }

  await browser.close();

  return lluvia;
}

exports.obtenerProbabilidades = obtenerProbabilidades
