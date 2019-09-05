export default class View {
    constructor() {

        /* TEST */
        /*
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
        */

    }



    _setInnerHTML(className, innerHTML) {
        document.querySelector(className).innerHTML = innerHTML;
    }

    setDateAndTime(date) {
        document.querySelector('.currentInfo__date').innerHTML = date;
    }

    setCityAndCountry(city, country) {
        this._setCityAndCountry(`${city}, ${country}`);
    }
    _setCityAndCountry(innerHTML) {
        this._setInnerHTML('.currentInfo__city', innerHTML);
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
        this._setCurrentTemperature(`${temperature}${unit}`);
    }
    _setCurrentTemperature(innerHTML) {
        this._setInnerHTML('.currentTemp', innerHTML)
    }

    setCurrentWindSpeed(windSpeed, unit) {
        this._setCurrentWindSpeed("Wind: ", `${windSpeed} ${unit}`);
    }
    _setCurrentWindSpeed(label, innerHTML) {
        this._setInnerHTML('.currentInfo__wind', label);
        this._setInnerHTML('.wind-value', innerHTML);
    }

    setCurrentWindDeg(windDeg) {
        var elem = document.querySelector('.currentInfo__windIcon');
        elem.classList.add('wi');
        elem.classList.add('wi-wind');
        elem.classList.add(`from-${windDeg}-deg`);
    }

    setCurrentHumidity(humidity, unit) {
        this._setCurrentHumidity("Humidity: ", `${humidity}${unit}`);
    }
    _setCurrentHumidity(label, innerHTML) {
        this._setInnerHTML('.currentInfo__humidity', label);
        this._setInnerHTML('.humidity-value', innerHTML);
    }

    setCurrentPressure(pressure, unit) {
        this._setCurrentPressure("Pressure: ", `${pressure} ${unit}`);
    }
    _setCurrentPressure(label, innerHTML) {
        this._setInnerHTML('.currentInfo__pressure', label);
        this._setInnerHTML('.pressure-value', innerHTML);
    }

    set5DaysTemperature(temp, unit) {
        const labels = document.querySelector('.forecast__day');
        const date = labels.firstElementChild;
        date.innerHTML = "Date";
        date.nextElementSibling.innerHTML = "Min";
        labels.lastElementChild.innerHTML = "Max";
        for (let i = 0; i < 4; i++) {
            document.querySelector('.forecast').querySelectorAll('.day')[i].innerHTML = temp[i].day;
            document.querySelector('.forecast').querySelectorAll('.min')[i].innerHTML = temp[i].temp_min + unit;
            document.querySelector('.forecast').querySelectorAll('.max')[i].innerHTML = temp[i].temp_max + unit;
        }
    }


    setInputValidationMessage(isValid) {
        const cityInput = document.querySelector('.form__input');
        if (isValid) {
            cityInput.setCustomValidity("");
        } else {
            cityInput.setCustomValidity("We cannot find what you're looking for, sorry! Try other city.");
        }
    }

    resetFields() {
        this.setDateAndTime("");
        this._setCityAndCountry("");
        this.setCurrentDescription("");
        this._setCurrentTemperature("");
        this._setCurrentWindSpeed("", "");
        this._setCurrentHumidity("", "");
        this._setCurrentPressure("", "");

        /* Brakuje setCurrentIcon, setCurrentWindDeg, set5DaysTemperature */

    }


}