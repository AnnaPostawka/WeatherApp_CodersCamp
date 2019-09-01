export default class View {
    constructor() {
        /* TEST */
        this.setDateAndTime('Wednesday 17:10');
        this.setCityAndCountry('Wrocław', 'PL');
        this.setCurrentIcon(200, 'day');
        this.setCurrentDescription('Hot as hell');
        this.setCurrentTemperature(28, '&degC');
        this.setCurrentWindSpeed(14, 'km/h');
        this.setCurrentWindDeg(50);
        this.setCurrentHumidity(48, '%');
        this.setCurrentPressure(1020, 'hPa');
        this.temp = [{
            day: 30.08,
            temp_min: 17,
            temp_max: 20
        }, {
            day: 31.08,
            temp_min: 18,
            temp_max: 22
        }, {
            day: 1.09,
            temp_min: 19,
            temp_max: 24
        }, {
            day: 2.09,
            temp_min: 20,
            temp_max: 26
        }]
        this.set5DaysTemperature(this.temp, '&degC');
    }
    setDateAndTime(date) {
        document.querySelector('.currentInfo__date').innerHTML = date;
    }
    setCityAndCountry(city, country) {
        document.querySelector('.currentInfo__city').innerHTML = `${city}, ${country}`;
    }
    setCurrentIcon(id, dayOrNight) {
        var elem = document.querySelector('.temperatureBox__weatherIcon');
        elem.classList.add('wi');
        elem.classList.add(`wi-owm-${dayOrNight}-${id}`);
    }
    setCurrentDescription(description) {
        document.querySelector('.currentInfo__sky').innerHTML = description;
    }
    setCurrentTemperature(temperature, unit) {
        document.querySelector('.currentTemp').innerHTML = `${temperature}${unit}`;
    }
    setCurrentWindSpeed(windSpeed, unit) {
        document.querySelector('.wind-value').innerHTML = `${windSpeed} ${unit}`;
    }
    setCurrentWindDeg(windDeg) {
        var elem = document.querySelector('.currentInfo__windIcon');
        elem.classList.add('wi');
        elem.classList.add('wi-wind');
        elem.classList.add(`from-${windDeg}-deg`);
    }
    setCurrentHumidity(humidity, unit) {
        document.querySelector('.humidity-value').innerHTML = `${humidity}${unit}`;
    }
    setCurrentPressure(pressure, unit) {
        document.querySelector('.pressure-value').innerHTML = `${pressure} ${unit}`
    }
    set5DaysTemperature(temp, unit) {
        for (let i = 0; i < 4; i++) {
            document.querySelector('.forecast').querySelectorAll('.day')[i].innerHTML = temp[i].day;
            document.querySelector('.forecast').querySelectorAll('.min')[i].innerHTML = temp[i].temp_min + unit;
            document.querySelector('.forecast').querySelectorAll('.max')[i].innerHTML = temp[i].temp_max + unit;
        }
    }
}