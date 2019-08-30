export default class Model {

    constructor(view) {
        this._view = view;
        this._apiKey = '2af7e2e12429ce3e4a759ae7a80c24f1';
        this._weatherData = undefined;
        this._forecastData = undefined;
        this._units = 'metric'; //metric or imperial or deafult
    }

    //location is an array with city name ['wroclaw']
    //or coords ['lat', 'long'] 
    changedLocation(location) {
        this._getWeatherData(location)
            .then((data) => {
                this._weatherData = data[0];
                this._forecastData = data[1];
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
                    this._weatherData = data[0];
                    this._forecastData = data[1];
                    console.log(data);
                });
        }
    }

    //location is an array with city name ['wroclaw']
    //or coords ['lat', 'long'] 
    async _getWeatherData(location) {
        let request;
        let requestForecast;
        if (location.length == 1) {
            const city = location[0];
            request = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this._units}&APPID=${this._apiKey}`;
            requestForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${this._units}&APPID=${this._apiKey}`;
        } else {
            const lat = location[0];
            const long = location[1];
            request = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${this._units}&APPID=${this._apiKey}`;
            requestForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${this._units}&APPID=${this._apiKey}`;
        }

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

        const weatherData = await this._weatherAPIRequest(request)
            .then(data => {

                this._view.setDateAndTime(this._getlocalTime(data.dt, data.timezone));
                this._view.setCityAndCountry(data.name, data.sys.country);
                this._view.setCurrentIcon(data.weather[0].id, this._dayOrNight(data.dt, data.timezone, data.sys.sunrise, data.sys.sunset));
                this._view.setCurrentDescription(data.weather[0].description);
                this._view.setCurrentTemperature(data.main.temp, tempUnit);
                this._view.setCurrentHumidity(data.main.humidity, '%');
                this._view.setCurrentWindSpeed(data.wind.speed, windSpeedUnit);
                this._view.setCurrentWindDeg(data.wind.deg, String.fromCharCode(176));
                this._view.setCurrentPressure(data.main.pressure, 'hPa');

                return data;
            });

        const forecastData = await this._weatherAPIRequest(requestForecast)
            .then((forecast) => {
                return this._forecastMinMaxTemps(forecast);
            }).then(minMaxTemps => {
                this._view.set4DaysTemperature(minMaxTemps, tempUnit);
                return minMaxTemps
            });

        return [weatherData, forecastData];
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

    _forecastMinMaxTemps(forecast) {
        const temp4Days = [];
        const timezoneOffset = forecast.city.timezone;
        const startingDate = this._getlocalTime(forecast.list[0].dt, timezoneOffset).setHours(0, 0, 0, 0);
        const dates = [];
        const allTemps = [[], [], [], [], [], []];

        forecast.list.forEach(data => {
            const localDate = this._getlocalTime(data.dt, timezoneOffset).setHours(0, 0, 0, 0);
            const localDay = this._getlocalTime(data.dt, timezoneOffset).getDate();
            const localMonth = this._getlocalTime(data.dt, timezoneOffset).getMonth() + 1;
            let day;
            let month;

            localDay.toString().length == 1 ? day = '0' + localDay : day = localDay;
            localMonth.toString().length == 1 ? month = '0' + localMonth : month = localMonth;
            const date = `${day}.${month}`;

            if (!dates.includes(date)) dates.push(date);

            switch (localDate) {
                case startingDate:
                    allTemps[0].push(data.main.temp);
                    break;
                case new Date(startingDate).setDate(new Date(startingDate).getDate() + 1):
                    allTemps[1].push(data.main.temp);
                    break;
                case new Date(startingDate).setDate(new Date(startingDate).getDate() + 2):
                    allTemps[2].push(data.main.temp);
                    break;
                case new Date(startingDate).setDate(new Date(startingDate).getDate() + 3):
                    allTemps[3].push(data.main.temp);
                    break;
                case new Date(startingDate).setDate(new Date(startingDate).getDate() + 4):
                    allTemps[4].push(data.main.temp);
                    break;
            }
        });

        for (let i = 1; i < dates.length - 1; i++) {
            temp4Days.push({
                date: dates[i],
                temp_min: Math.min(...allTemps[i]),
                temp_max: Math.max(...allTemps[i]),
            });
        }
        console.log(temp4Days);
        return temp4Days;
    }

    //method returning 'day' or 'night' depending on current time, sunrise and sunset
    _dayOrNight(currentTime, timezoneOffset, sunrise, sunset) {
        const localCurrentTime = this._getlocalTime(currentTime, timezoneOffset);
        const localSunrise = this._getlocalTime(sunrise, timezoneOffset);
        const localSunset = this._getlocalTime(sunset, timezoneOffset);

        if (localSunrise <= localCurrentTime && localCurrentTime < localSunset) {
            return 'day';
        } else {
            return 'night';
        }
    }
}