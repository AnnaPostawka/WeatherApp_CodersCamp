export default class Model {

    constructor(view) {
        this._view = view;
        this._apiKey = '2af7e2e12429ce3e4a759ae7a80c24f1';
        this._weatherData = undefined;
        this._units = 'metric'; //metric or imperial or deafult
    }

    //location is an array with city name ['wroclaw']
    //or coords ['lat', 'long'] 
    changedLocation(location) {
        this._getWeatherData(location)
            .then((data) => {
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

                this._view.setDateAndTime(new Date());
                this._view.setCityName(data.name);
                this._view.setCountry(data.sys.country);
                this._view.setCurrentIcon(data.weather[0].icon);
                this._view.setCurrentDescription(data.weather[0].description);
                this._view.setCurrentTemperature(data.main.temp);
                this._view.setCurrentHumidity(data.main.humidity);
                this._view.setCurrentWindSpeed(data.wind.speed);
                this._view.setCurrentWindDeg(data.wind.deg);

                switch (this._units) {
                    case 'default':
                        this._view.setTemperatureUnit('K');
                        this._view.setWindSpeedUnit('m/s');
                        break;
                    case 'metric':
                        this._view.setTemperatureUnit(String.fromCharCode(176) + 'C');
                        this._view.setWindSpeedUnit('m/s');
                        break;
                    case 'imperial':
                        this._view.setTemperatureUnit(String.fromCharCode(176) + 'F');
                        this._view.setWindSpeedUnit('mph');
                        break;
                    default:
                        console.log('wrong unit')
                }
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