export default class Model {
    constructor() {
        this._apiKey = '2af7e2e12429ce3e4a759ae7a80c24f1';
    }

    async getWeatherForCity(cityName) {
        const request = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${this._apiKey}`;
        const weatherData = await this._weatherAPIRequest(request)
            .then(data => {
                return data;
            });    
        return weatherData;
    }

    async getWeatherForCoords(lat, long) {
        const request = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${this._apiKey}`;
        const weatherData = await this._weatherAPIRequest(request)
            .then(data => {
                return data;
            });
        return weatherData;
    }

    async _weatherAPIRequest(request) {
        const response = await fetch(request);
        const data = await response.json();
        return data;
    }
}