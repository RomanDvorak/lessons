'use strict';

function getTime() {
  let date = new Date();
  let hours = (date.getHours()).toString();
  if (hours.length < 2) {
    hours = '0' + hours;
  }
  let minutes = (date.getMinutes()).toString();
  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }
  let seconds = (date.getSeconds()).toString();
  if (seconds.length < 2) {
    seconds = '0' + seconds;
  }
  document.body.innerText = hours + ':' + minutes + ':' + seconds;
}

setInterval(getTime, 1000);