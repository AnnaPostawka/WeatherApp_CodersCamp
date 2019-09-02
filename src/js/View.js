export default class View {
    constructor() {
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
    set4DaysTemperature(temp, unit) {
        for (let i = 0; i < 4; i++) {
            document.querySelector('.forecast').querySelectorAll('.day')[i].innerHTML = temp[i].date;
            document.querySelector('.forecast').querySelectorAll('.min')[i].innerHTML = temp[i].temp_min + unit;
            document.querySelector('.forecast').querySelectorAll('.max')[i].innerHTML = temp[i].temp_max + unit;
        }
    }
}
