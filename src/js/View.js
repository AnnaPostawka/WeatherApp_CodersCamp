export default class View {
    constructor() {
        /* TEST */
        /*
        this.setDateAndTime('Wednesday 17:10');
        this.setCityAndCountry('Wroclaw', 'PL');
        this.setCurrentDescription('hot as hell');
        this.setCurrentTemperature(28, '&degC');
        this.setCurrentHumidity(48);
        this.setCurrentWindSpeed(14, 'km/h');
        */
        /*this.set5DaysTemperature('&degC');
        this.setCurrentWindDeg(50);
        this.setCurrentIcon("");*/
    }



    setDateAndTime(date) {
        document.querySelector('.currentInfo__date').innerHTML = date;
    }
    setCityAndCountry(city, country) {
        document.querySelector('.currentInfo__city').innerHTML = `${city}, ${country}`;
    }

    /* Doesn't work yet */
    setCurrentIcon(icon) {
        var elem = document.querySelector('.temperatureBox__weatherIcon');
        elem.classList.remove('far');
        elem.classList.remove('fa-sun');
        elem.classList.remove('fa-3x');
        elem.classList.add('wi');
        elem.classList.add('wi-day-sunny');
    }

    setCurrentDescription(description) {
        document.querySelector('.currentInfo__sky').innerHTML = description;
    }
    setCurrentTemperature(temperature, unit) {
        document.querySelector('.temperatureBox__tempValue').innerHTML = `${temperature}${unit}`;
    }
    setCurrentPressure(pressure, unit) {
        document.querySelector('.currentInfo__pressure').getElementsByTagName('span')[0].innerHTML = `${pressure} ${unit}`
    }
    setCurrentHumidity(humidity, unit) {
        document.querySelector('.currentInfo__humidity').getElementsByTagName('span')[0].innerHTML = `${humidity}${unit}`;
    }
    setCurrentWindSpeed(windSpeed, unit) {

        document.querySelector('.currentInfo__wind').getElementsByTagName('span')[0].innerHTML = `${windSpeed} ${unit}`;
    }

    /* Doesn't work yet */
    setCurrentWindDeg(windDeg) {
        var elem = document.querySelector('.currentInfo__windIcon');
        elem.classList.remove('fas');
        elem.classList.remove('fa-wind');
        elem.classList.add('wi');
        elem.classList.add('wi-wind');
        elem.classList.add(`towards-${windDeg}-deg`);
    }
    set5DaysTemperature(temp, unit) {}
    /*
    const temp = [{
        date: 28.08,
        temp_min: 30,
        temp_max: 32
    }, {
        date: 29.08,
        temp_min: 17,
        temp_max: 20
    }, {
        date: 30.08,
        temp_min: 18,
        temp_max: 24
    }, {
        date: 31.08,
        temp_min: 17,
        temp_max: 20
    }, {
        date: 1.09,
        temp_min: 18,
        temp_max: 24
    }];
    for (let i = 0; i < 5; i++) {
        document.querySelectorAll('.day')[i].innerHTML = temp[i].date;
        document.querySelector('.min')[i].innerHTML = `${temp[i].temp_min}${unit}`;
        document.querySelector('.max')[i].innerHTML = `${temp[i].temp_max}${unit}`;
    }
    */
}