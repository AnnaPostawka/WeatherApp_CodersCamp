export default class View {
    constructor() {
        this.setCurrentWindSpeed(14, 'mph');
    }

    setDateAndTime(date) {
        document.querySelector('.currentInfo__date').innerHTML = date;
    }

    /*
    setCityName(city) {
        document.querySelector('.currentInfo__city').innerHTML = city;
    }
    setCountry(country) {}
    */
    setCityAndCountry(city, country) {
        document.querySelector('.currentInfo__city').innerHTML = `${city}, ${country}`;
    }

    setCurrentIcon(icon) {}
    setCurrentDescription(description) {
        document.querySelector('.currentInfo__sky').innerHTML = description;
    }
    setCurrentTemperature(temperature) {}
    setTemperatureUnit(unit) {}
    setCurrentHumidity(humidity) {
        document.querySelector('.currentInfo__humidity').getElementsByTagName('span')[0].innerHTML = `${humidity}%`;
    }

    /*
    setCurrentWindSpeed(windSpeed) {

        document.querySelector('.currentInfo__wind').getElementsByTagName('span')[0].innerHTML = `${windSpeed}`;
    }
    setWindSpeedUnit(unit) {}
    */
    setCurrentWindSpeed(windSpeed, unit) {

        document.querySelector('.currentInfo__wind').getElementsByTagName('span')[0].innerHTML = `${windSpeed} ${unit}`;
    }

    setCurrentWindDeg(windDeg) {}
    set5DaysMinTemperature(temperature) {}
    set5DaysMaxTemperature(temperature) {}

}