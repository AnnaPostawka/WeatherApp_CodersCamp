export default class View {
    
    constructor() {
        this.app = this.getElement('#root')

        this.cityForm = this.createElement('form', 'cityForm');
        this.cityInput = this.createElement('input', 'cityName');
        this.cityInput.placeholder = 'city';
        this.citySubmit = this.createElement('input', 'citySubmit');
        this.citySubmit.type = 'submit';
        this.citySubmit.value = 'OK';
        this.weatherData = this.createElement('div', 'weatherData');

        this.cityForm.append(this.cityInput, this.citySubmit);
        this.app.append(this.cityForm, this.weatherData);
    }

    get _cityInput() {
        return this.cityInput.value;
    }

    _clearCityInput() {
        this.cityInput.value = '';
    }

    createElement(tag, className, id) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        if (id) element.id = id;

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }

    displayWeather(weatherData) {
        const city = weatherData.name;
        const temp = weatherData.main.temp;
        const pressure = weatherData.main.pressure;
        const humidity = weatherData.main.humidity;

        this.weatherData.innerText = `City ${city} temperature ${temp} pressure ${pressure} humidity ${humidity}`;
    }

    bindGetWeatherForCity(handler) {
        this.citySubmit.addEventListener('click', event => {
            event.preventDefault();

            if (this._cityInput) {
                handler(this._cityInput)
                this._clearCityInput();
            }
        })
    }

    bindGetWeatherForCoords(handler) {
        window.addEventListener('load', event => {
            event.preventDefault();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const long = pos.coords.longitude;
                    const lat = pos.coords.latitude;
                    handler(lat, long);
                })
            }
        })
    }

}