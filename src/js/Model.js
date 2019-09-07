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
    async changedLocation(location) {
        const data = await this._getWeatherData(location)
        this._weatherData = data[0];
        this._forecastData = data[1];
        this._callViewMethods(data[0], data[1]);
    }

    //unit is set to new unit
    //if city has been already saved in weatherData
    //metod for getting weatherData is called for this city
    async changedUnits(unit) {
        this._units = unit;
        if (this._weatherData) {
            const data = await this._getWeatherData([this._weatherData.name]);
            this._weatherData = data[0];
            this._forecastData = data[1];
            this._callViewMethods(data[0], data[1]);
        }
    }

    //location is an array with city name ['wroclaw']
    //or coords ['lat', 'long'] 
    async _getWeatherData(location) {
        return new Promise(async (resolve) => {

            const [request, requestForecast] = this._getApiRequestsForLocation(location);
            try {
                const weatherData = await this._weatherAPIRequest(request);
                const forecastData = await this._weatherAPIRequest(requestForecast);
                if (weatherData && forecastData) {
                    const minMaxTemps = this._forecastMinMaxTemps(forecastData);
                    console.log([weatherData, minMaxTemps]);
                    resolve([weatherData, minMaxTemps]);
                }
            } catch (err) {
                console.log(err.message);
                console.log('try another city')
                this._view.showWrongCityAlert();
            }
        })

    }

    //method fetching weather data
    async _weatherAPIRequest(request) {

        const response = await fetch(request);
        if (response.status !== 200) {
            throw new Error("Response error", response.status)
        } else {
            const response = await fetch(request);
            const data = await response.json();
            return data;
        }

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

    _getUnitStrings() {
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
        return [tempUnit, windSpeedUnit];
    }

    _getApiRequestsForLocation(location) {
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
        return [request, requestForecast];
    }

    _callViewMethods(weatherData, forecastData) {
        console.log('calling view methods');
        
        const [tempUnit, windSpeedUnit] = this._getUnitStrings();

        this._view.setDateAndTime(this._formatDate(this._getlocalTime(weatherData.dt, weatherData.timezone)));
        this._view.setCityAndCountry(weatherData.name, weatherData.sys.country);
        this._view.setCurrentIcon(weatherData.weather[0].id, this._dayOrNight(weatherData.dt, weatherData.timezone, weatherData.sys.sunrise, weatherData.sys.sunset));
        this._view.setCurrentDescription(weatherData.weather[0].description);
        this._view.setCurrentTemperature(weatherData.main.temp, tempUnit);
        this._view.setCurrentHumidity(weatherData.main.humidity, '%');
        this._view.setCurrentWindSpeed(weatherData.wind.speed, windSpeedUnit);
        this._view.setCurrentWindDeg(weatherData.wind.deg, String.fromCharCode(176));
        this._view.setCurrentPressure(weatherData.main.pressure, 'hPa');
        this._view.set4DaysTemperature(forecastData, tempUnit);
        this._view.changeBgImage(this._dayOrNight(weatherData.dt, weatherData.timezone, weatherData.sys.sunrise, weatherData.sys.sunset));
    }

    _formatDate(date) {
        const dateFormat = require('dateformat');
        return dateFormat(date, "dddd yyyy.mm.dd h:MM:ss TT");
    }

}