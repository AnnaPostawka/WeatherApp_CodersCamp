export default class Model {

    constructor(view) {
        this._view = view;
        this._apiKey = '2af7e2e12429ce3e4a759ae7a80c24f1';
        this._weatherData = undefined;
        this._units = 'metric';  //metric or imperial
    }

    //location is an array with city name ['wroclaw']
    //or coords ['lat', 'long'] 
    changedLocation(location) {
        this._getWeatherData(location)
            .then((data) => {
                //call view method;
                this._weatherData = data;
                console.log(data);
            });
    }

    //unit is set to new unit
    //if city has been already saved in weatherData
    //metod for getting weatherData is called for this city
    changedUnits(unit) {
        this._units = unit;
        if (this._weatherData) {
            this._getWeatherData([this._weatherData.name])
                .then((data) => {
                    //call view method
                    this._weatherData = data;
                    console.log(data);
                });
        }
    }

    //location is an array with city name ['wroclaw']
    //or coords ['lat', 'long'] 
    _getWeatherData(location) {
        let request;
        if (location.length == 1) {
            const city = location[0];
            request = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this._units}&APPID=${this._apiKey}`;
        } else {
            const lat = location[0];
            const long = location[1];
            request = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${this._units}&APPID=${this._apiKey}`;
        }

        const weatherData = this._weatherAPIRequest(request)
            .then(data => {
                return data;
            });
        return weatherData;
    }

    //method fetching weather data
    async _weatherAPIRequest(request) {
        const response = await fetch(request);
        const data = await response.json();
        return data;
    }
}