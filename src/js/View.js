import fog from "Images/fog.jpg";
import night from 'Images/night.jpg';

export default class View {
    constructor() {
        this._iconName = "";
    }



    _setInnerHTML(className, innerHTML) {
        document.querySelector(className).innerHTML = innerHTML;
    }

    setDateAndTime(date) {
        document.querySelector('.currentInfo__date').innerHTML = date;
    }

    setCityAndCountry(city, country) {
        this._setInnerHTML('.currentInfo__city', `${city}, ${country}`);

    }

    setCurrentIcon(id, dayOrNight) {
        // CODE_REVIEW Bezpieczniej używać let i const.
        var elem = document.querySelector('.temperatureBox__weatherIcon');
        const newIconName = `wi-owm-${dayOrNight}-${id}`;
        if (this._iconName) {
            elem.classList.replace(this._iconName, newIconName);
        } else {
            elem.classList.add('wi');
            elem.classList.add(newIconName);
        }
        this._iconName = newIconName;
    }

    setCurrentDescription(description) {
        this._setInnerHTML('.currentInfo__sky', description);

    }

    setCurrentTemperature(temperature, unit) {
        this._setInnerHTML('.currentTemp', `${temperature}${unit}`)
    }

    setCurrentWindSpeed(windSpeed, unit) {
        this._setInnerHTML('.wind-value', `Wind: ${windSpeed} ${unit}`);
    }

    setCurrentWindDeg(windDeg) {
        var elem = document.querySelector('.currentInfo__windIcon');
        elem.classList.add('wi');
        elem.classList.add('wi-wind');
        elem.classList.add(`from-${windDeg}-deg`);
    }

    setCurrentHumidity(humidity, unit) {
        this._setInnerHTML('.humidity-value', `Humidity: ${humidity}${unit}`);
    }

    setCurrentPressure(pressure, unit) {
        this._setInnerHTML('.pressure-value', `Pressure: ${pressure} ${unit}`);
    }

    set4DaysTemperature(temp, unit) {
        const labels = document.querySelector('.forecast__day');
        const date = labels.firstElementChild;
        date.innerHTML = "Date";
        // CODE_REVIEW innerText w tym przypadku zasadniejszy niż innerHTML
        date.nextElementSibling.innerHTML = "Min";
        labels.lastElementChild.innerHTML = "Max";
        for (let i = 0; i < temp.length; i++) {
            document.querySelector('.forecast').querySelectorAll('.day')[i].innerHTML = temp[i].date;
            document.querySelector('.forecast').querySelectorAll('.min')[i].innerHTML = temp[i].temp_min + unit;
            document.querySelector('.forecast').querySelectorAll('.max')[i].innerHTML = temp[i].temp_max + unit;
        }
    }

    showWrongCityAlert() {
        const sweetalert = require('sweetalert');
        sweetalert({
            title: "Ooops",
            text: "We cannot find what you're looking for, sorry! Try other city.",
            icon: "error",
        });
    }

    changeBgImage(dayOrNight) {
        if (dayOrNight === 'day') {
            console.log('day');
            document.querySelector('.container').style.backgroundImage = `url(${fog})`;
        } else {
            console.log('night');
            document.querySelector('.container').style.backgroundImage = `url(${night})`;
        }
    }

}