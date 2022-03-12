const axios = require('axios')
const URLS = [
   'https://api.chucknorris.io/jokes/random',
   'https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1',
   'https://catfact.ninja/fact',
]

function randomIntFromInterval(min, max) {
   // min and max included
   return Math.floor(Math.random() * (max - min + 1) + min)
}

async function randomQuote(req, res) {
   selectedLinkIndex = randomIntFromInterval(0, 2)
   const link = URLS[selectedLinkIndex]
   try {
      const { data } = await axios.get(link)
      const { fact, value } = data
      let quote = fact || value
      if (!quote) quote = data[0].fact
      return res.status(200).json({
         code: 200,
         status: 'success',
         fact: quote,
      })
   } catch (err) {
      return res.status(400).json({
         code: 400,
         status: 'error',
         message: 'internal server error',
         err,
      })
   }
}

module.exports = {
   randomQuote,
}
