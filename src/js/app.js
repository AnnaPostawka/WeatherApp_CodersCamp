import Controller from "./Controller.js";
import Model from "./Model.js";
import View from "./View.js";
import "../style/style.css";
import "../style/weather-icons-wind.min.css";
import "../style/weather-icons.min.css";

const view = new View();
const model = new Model(view);
const appController = new Controller(model, view);

const addToWeatherModalClass = () => {
    const weatherModal = document.querySelector('.weather-Info-Container');
    if (weatherModal.classList.length != 2) {
        weatherModal.classList.add('weather-Info-Container--active')
    }
}
const timeout = setTimeout(() => { addToWeatherModalClass() }, 2000);