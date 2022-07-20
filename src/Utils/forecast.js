const request = require('postman-request');


const forecast = (city, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=ea2727f87011c24edec07b9024307119&query=${city}`;

   request({ url: url, json: true }, (error, response) => {
      if (error) {
         callback("Unable to connect !", null);
      } else {
         try {
            callback(null, {
               temperature: response.body.current.temperature,
               feelslike: response.body.current.feelslike,
               place: response.body.request.query,
               weatherPhoto: response.body.current.weather_icons,
            });
         } catch (e) {
            callback("Unknown error , May be place not found", null);
         }
      }
   })
}



module.exports = forecast;
