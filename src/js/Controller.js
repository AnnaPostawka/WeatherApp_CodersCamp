const Units = {
  METRIC: 'metric',
  IMPERIAL: 'imperial'
}

export default class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this._checkLocalStorage()
    this._onLocationChange()
    this._onUnitsChanged()

  }
  _onLocationChange() {
    const form = document.querySelector('.form')
    form.addEventListener('submit', event => {
      event.preventDefault()
      const input = form.querySelector('.form__input');
      this.model.changedLocation([input.value])
      localStorage.setItem("cityName", [input.value])
    })
  }

  _onUnitsChanged() {
    const toggle = document.querySelector('#switch')
    toggle.addEventListener('click', event => {
      if (toggle.checked) {
        this.model.changedUnits(Units.METRIC)
        localStorage.setItem('units', Units.METRIC)
      } else {
        this.model.changedUnits(Units.IMPERIAL)
        localStorage.setItem('units', Units.IMPERIAL)
      }
    })
  }

  _checkLocalStorage() {
    if (localStorage.getItem('cityName')) {
      window.addEventListener('load', event => {
        this.model.changedLocation([localStorage.getItem("cityName")])
      })
    } else {
      this._checkGeoLocation()
    }
    const units = localStorage.getItem('units')
    if (units == Units.METRIC) {
      document.querySelector('#switch').checked = true
      this.model.changedUnits(Units.METRIC)
    }
    if (units == Units.IMPERIAL) {
      document.querySelector('#switch').checked = false
      this.model.changedUnits(Units.IMPERIAL)
    }
  }
  _checkGeoLocation() {
    window.addEventListener('load', event => {
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(pos => {
          const long = pos.coords.longitude;
          const lat = pos.coords.latitude;
          this.model.changedLocation([lat, long]);
        })
      }
    })
  }
}