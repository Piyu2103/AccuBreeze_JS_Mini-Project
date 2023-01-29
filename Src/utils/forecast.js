const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=774ce0f814fa40ee856165601211003&q=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data =
        body.current.condition.text +
        ".\n" +
        "Today's Temperature is " +
        body.current.temp_c +
        "°C. " +
        "\nFeels like " +
        body.current.feelslike_c +
        "°C." +
        "\n" +
        "Wind  - " +
        body.current.wind_kph +
        "kph (" +
        body.current.wind_dir +
        ") " +
        "\n" +
        "Humidity - " +
        body.current.humidity +
        "\n" +
        "Last Updated : " +
        body.current.last_updated;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
