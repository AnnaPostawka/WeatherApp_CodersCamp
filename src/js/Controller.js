export default class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.bindGetWeatherForCity(this.handleGetWeatherForCity);
    this._checkLocalStorage()
  }

  _checkLocalStorage() {
    if (localStorage.getItem("cityName")) {
      window.addEventListener('load', event => {
        this.model.getWeatherForCity(localStorage.getItem("cityName"))
          .then(weatherData => this.view.displayWeather(weatherData))
      })
    } else {
      this.view.bindGetWeatherForCoords(this.handleGetWeatherForCoords);
    }
  }
  handleGetWeatherForCity = (cityName) => {
    const elem = this.view.createElement("p")
    const last = this.view.app.querySelector("p:last-of-type")
    if (last !== null) {
      this.view.app.removeChild(last)
    }
    this.model.getWeatherForCity(cityName)
      .then((weatherData) => {
        this.view.displayWeather(weatherData);
        localStorage.setItem("cityName", cityName)
      })
      .catch(err => {
        elem.innerHTML = `Nie ma miasta o nazwie ${cityName}`;
        this.view.app.appendChild(elem)
      });
  }
  handleGetWeatherForCoords = (lat, long) => {
    this.model.getWeatherForCoords(lat, long)
      .then((weatherData) => {
        this.view.displayWeather(weatherData);
      });
  }
}