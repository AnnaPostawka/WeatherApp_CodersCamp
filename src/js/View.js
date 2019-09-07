export default class View {
    constructor() {}



    _setInnerHTML(className, innerHTML) {
        document.querySelector(className).innerHTML = innerHTML;
    }

    setDateAndTime(date) {
        document.querySelector('.currentInfo__date').innerHTML = date;
    }

    setCityAndCountry(city, country) {
        // this._setCityAndCountry(`${city}, ${country}`);
        this._setInnerHTML('.currentInfo__city', `${city}, ${country}`);

    }
    // _setCityAndCountry(innerHTML) {
    //     this._setInnerHTML('.currentInfo__city', innerHTML);
    // }

    setCurrentIcon(id, dayOrNight) {
        var elem = document.querySelector('.temperatureBox__weatherIcon');
        elem.classList.add('wi');
        elem.classList.add(`wi-owm-${dayOrNight}-${id}`);
    }

    setCurrentDescription(description) {
        // document.querySelector('.currentInfo__sky').innerHTML = description;
        this._setInnerHTML('.currentInfo__sky', description);

    }

    setCurrentTemperature(temperature, unit) {
        this._setInnerHTML('.currentTemp', `${temperature}${unit}`)
        // this._setCurrentTemperature(`${temperature}${unit}`);
    }
    // _setCurrentTemperature(innerHTML) {
    //     this._setInnerHTML('.currentTemp', innerHTML)
    // }

    setCurrentWindSpeed(windSpeed, unit) {
        this._setInnerHTML('.wind-value', `Wind: ${windSpeed} ${unit}`);
        // this._setCurrentWindSpeed("Wind: ", `Wind: ${windSpeed} ${unit}`);
    }
    // _setCurrentWindSpeed(label, innerHTML) {
    //     this._setInnerHTML('.currentInfo__wind', label);
    //     this._setInnerHTML('.wind-value', innerHTML);
    // }

    setCurrentWindDeg(windDeg) {
        var elem = document.querySelector('.currentInfo__windIcon');
        elem.classList.add('wi');
        elem.classList.add('wi-wind');
        elem.classList.add(`from-${windDeg}-deg`);
    }

    setCurrentHumidity(humidity, unit) {
        // this._setCurrentHumidity("Humidity: ", `${humidity}${unit}`);
        this._setInnerHTML('.humidity-value', `Humidity: ${humidity}${unit}`);
    }
    // _setCurrentHumidity(label, innerHTML) {
    //     this._setInnerHTML('.currentInfo__humidity', label);
    //     this._setInnerHTML('.humidity-value', innerHTML);
    // }

    setCurrentPressure(pressure, unit) {
        // this._setCurrentPressure("Pressure: ", `${pressure} ${unit}`);
        this._setInnerHTML('.pressure-value', `Pressure: ${pressure} ${unit}`);
    }
    // _setCurrentPressure(label, innerHTML) {
    //     this._setInnerHTML('.currentInfo__pressure', label);
    //     this._setInnerHTML('.pressure-value', innerHTML);
    // }

    set4DaysTemperature(temp, unit) {
        const labels = document.querySelector('.forecast__day');
        const date = labels.firstElementChild;
        date.innerHTML = "Date";
        date.nextElementSibling.innerHTML = "Min";
        labels.lastElementChild.innerHTML = "Max";
        for (let i = 0; i < 4; i++) {
            document.querySelector('.forecast').querySelectorAll('.day')[i].innerHTML = temp[i].date;
            document.querySelector('.forecast').querySelectorAll('.min')[i].innerHTML = temp[i].temp_min + unit;
            document.querySelector('.forecast').querySelectorAll('.max')[i].innerHTML = temp[i].temp_max + unit;
        }
    }

    showWrongCityAlert(){
        const sweetalert = require('sweetalert');
        sweetalert({
            title: "Ooops",
            text: "We cannot find what you're looking for, sorry! Try other city.",
            icon: "error",
          });
    }

    changeBgImage(dayOrNight) {
        if (dayOrNight === 'day') {
            document.querySelector('.container').style.backgroundImage = 'url("../src/assets/images/fog.jpg")';
        } else {
            document.querySelector('.container').style.backgroundImage = 'url("../src/assets/images/night.jpg")';
        }
    }

}