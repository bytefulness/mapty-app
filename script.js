'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

// Access User Location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // When success getting location
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      // Leatlef Library
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapE) {
        // Copy event object to variable
        mapEvent = mapE;

        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },

    // When fail getting location
    function () {
      alert('Could not get position. Please check the location permission.');
    }
  );
}

// Event Listener for Form
form.addEventListener('submit', function (e) {
  e.preventDefault();

  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
    '';

  inputCadence.blur();
  inputElevation.blur();

  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxwidth: 150,
        minwidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
