const _ = require('lodash');
const calculator = require('./calculator');
const draw = require('./draw');

var tmonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function GetClock () {
  var d = new Date();
  var nmonth = d.getMonth(),
    ndate = d.getDate(),
    nyear = d.getYear();

  if (nyear < 1000) nyear += 1900;

  var nhour = d.getHours(),
    nmin = d.getMinutes(),
    nsec = d.getSeconds();

  if (nmin <= 9) nmin = '0' + nmin;
  if (nsec <= 9) nsec = '0' + nsec;

  document.getElementById('clockbox').innerHTML = '' + tmonth[nmonth] + ' ' + ndate + ', ' + nyear + '<br />' + nhour + ':' + nmin + ':' + nsec + '';
}

let currentLST = calculator.getLocationPromise();

document.getElementById('star-map').insertAdjacentHTML('afterbegin', `<iframe src="http://server1.sky-map.org/skywindow?ra=${currentLST}&zoom=1&img_source=SDS&show_grid=0&show_constellation_boundaries=0" style="border-width: 0; z-index: -10;"></iframe>`);


module.exports = {};
