export default class Model {
    constructor() {
        this._apiKey = '2af7e2e12429ce3e4a759ae7a80c24f1';
    }

    getWeatherForCity(cityName) {
        const request = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${this._apiKey}`;
        const weatherData = this._weatherAPIRequest(request)   
        return weatherData;
    }

    getWeatherForCoords(lat, long) {
        const request = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${this._apiKey}`;
        const weatherData = this._weatherAPIRequest(request)
        return weatherData;
    }

    async _weatherAPIRequest(request) {
        try{
        const response = await fetch(request);
        const data = await response.json();
        return data;
        }catch(err){
            console.log("sdfsdf ")
        }
        
    }
}

