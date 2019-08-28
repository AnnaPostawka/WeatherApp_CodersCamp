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
                let tempUnit;
                let windSpeedUnit;

                switch (this._units) {
                    case 'default':
                        tempUnit = 'K';
                        windSpeedUnit = 'm/s';
                        break;
                    case 'metric':
                        tempUnit = String.fromCharCode(176) + 'C';
                        windSpeedUnit = 'm/s';
                        break;
                    case 'imperial':
                        tempUnit = String.fromCharCode(176) + 'F';
                        windSpeedUnit = 'mph';
                        break;
                    default:
                        console.log('wrong unit')
                }

                this._view.setDateAndTime(this._getlocalTime(data.dt, data.timezone));
                this._view.setCityAndCountry(data.name, data.sys.country);
                this._view.setCurrentIcon(data.weather[0].icon);
                this._view.setCurrentDescription(data.weather[0].description);
                this._view.setCurrentTemperature(data.main.temp, tempUnit);
                this._view.setCurrentHumidity(data.main.humidity, '%');
                this._view.setCurrentWindSpeed(data.wind.speed, windSpeedUnit);
                this._view.setCurrentWindDeg(data.wind.deg, String.fromCharCode(176));
                this._view.setCurrentPressure(data.main.pressure, 'hPa');

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

    _getlocalTime(datetime, timezone) {

        const now = new Date(datetime * 1000);
        now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
        now.setMinutes(now.getMinutes() + timezone / 60);

        return now;
    }
}