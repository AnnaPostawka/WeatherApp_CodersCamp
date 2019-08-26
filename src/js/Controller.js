export default class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
      this.view.bindGetWeatherForCity(this.handleGetWeatherForCity);
      this.view.bindGetWeatherForCoords(this.handleGetWeatherForCoords);
    }
  
    handleGetWeatherForCity = (cityName) => {
      this.model.getWeatherForCity(cityName)
      .then((weatherData) => {
        this.view.displayWeather(weatherData);
      })
      .catch(err =>
        console.log(err)
      );
    }
  
    handleGetWeatherForCoords = (lat, long) => {
      this.model.getWeatherForCoords(lat, long)
      .then((weatherData) => {
        this.view.displayWeather(weatherData);
      });
    }
  }

