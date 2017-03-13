const Promise = require('bluebird');

function showLocation (longitude) {
  const currentTime = new Date();
  // 'Sun, 12 Mar 2017 22:41:34 GMT'

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~ JULIAN DATE ~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let year = currentTime.getUTCFullYear();
  let month = currentTime.getUTCMonth();
  let day = currentTime.getUTCDate();

  if (month <= 2) {
    year--;
    month += 12;
  }

  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  const c = Math.floor(365.25 * year);
  const e = Math.floor(30.6001 * (month + 1));

  const julianDate = b + c + day + e + 1720994.5;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~ GREENWICH SIDEREAL TIME ~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let hours = currentTime.getUTCHours();
  let minutes = currentTime.getUTCMinutes();
  let seconds = currentTime.getUTCSeconds();

  const ut = hours + (minutes / 60) + (seconds / 3600);

  const t = (julianDate - 2451545.0) / 36525.0;
  let t0 = 6.697374558 + (2400.051336 * t) + (0.000025862 * t * t) + ( ut * 1.0027379093);

  while (t0 > 24) {
    t0 -= 24;
  }

  while (t0 < 0) {
    t0 += 24;
  }

  const gst = t0;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~ LOCAL SIDEREAL TIME ~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // let longitude = -73.95030498504639;
  let lst = gst + (longitude / 15);

  while (lst > 24) {
    lst -= 24;
  }

  while (lst < 0) {
    lst += 24;
  }

  return lst;
}

const getLocationPromise = function () {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve(position.coords.longitude);
      })
    } else {
      reject(console.error);
    }
  }).then(long => showLocation(long))
}

module.exports = {
  getLocationPromise: getLocationPromise,
  showLocation: showLocation,
}



















