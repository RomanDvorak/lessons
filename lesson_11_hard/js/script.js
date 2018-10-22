window.addEventListener('DOMContentLoaded', function() {

  'use strict';
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector(".info-header"),
      tabContent = document.querySelectorAll(".info-tabcontent"),
      isIE = false,
      isMob = false;
  if (/MSIE 10/i.test(navigator.userAgent) || 
    /MSIE 9/i.test(navigator.userAgent) || 
    /rv:11.0/i.test(navigator.userAgent) || 
    /Edge\/\d./i.test(navigator.userAgent)) {
    // Проверяет, является браузер IE 10, IE 9, IE 11, Edge или нет
    isIE = true;
  }
  if(navigator.userAgent.match(/iPad/i) || 
    navigator.userAgent.match(/iPhone/i) || 
    navigator.userAgent.match(/Android/i)){
    //Проверяет, является устройство мобильным или нет
    isMob = true;
   }

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for(let i = 0;i< tab.length; i++) {
        if (target ==tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // timer
  let deadline = '2018-10-20';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = (Math.floor((t/1000) % 60)).toString(),
        minutes = (Math.floor((t/1000/60) % 60)).toString(),
        hours = (Math.floor((t/(1000*60*60)))).toString();
        if (seconds.length < 2) {
          seconds = '0' + seconds;
        }
        if (minutes.length < 2) {
          minutes = '0' + minutes;
        }
        if (hours.length < 2) {
          hours = '0' + hours;
        }
        
        return {
          'total' : t,
          'hours' : hours,
          'minutes' : minutes,
          'seconds' : seconds
        };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);
  
  // Modal

  let more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');
  if (isMob || !isIE) {
    overlay.classList.remove('fade');
  }

  document.body.addEventListener('click', function(e) {
    if (e.target.classList == "description-btn") {
      overlay.style.display = 'block';
      if (!isIE && !isMob) {
        animFade(overlay);
      }
    } 
    else if (e.target.classList == "more") {
      overlay.style.display = 'block';
      if(!isMob && isIE) {
        more.classList.add('more-splash');
      }
      document.body.style.overflow = 'hidden';
      if (!isIE && !isMob) {
        animFade(overlay);
      }
    }
  });
  close.addEventListener('click', function() {
    overlay.style.display = 'none';
    if(!isMob && isIE) {
      more.classList.remove('more-splash');
    }
    document.body.style.overflow = '';
  });


  function animFade(elem) {
    let op = 0.1,
        id = requestAnimationFrame(fade);

    function fade () {
      if (op == 1) {
        clearInterval(id);
      } else {
        op += 0.1;
        elem.style.opacity = op;
        id = requestAnimationFrame(fade);
      }
    }
  }

  // Form

  let message = {
    loading: '<div class="status-ico-div"><img src="icons/loading.svg" class="status-ico" alt="loading"><span>Идёт загрузка, подождите...</span></div>',
    success: '<div class="status-ico-div"><img src="icons/checked.svg" class="status-ico" alt="checked"><span>Заявка успешно оставлена, мы вам перезвоним!</span></div>',
    failure: '<div class="status-ico-div"><img src="icons/error.svg" class="status-ico" alt="fail"><span>Произошла ошибка, повторите попытку!</span></div>'
  };

  let popupForm = document.querySelector('.main-form'),
      input = popupForm.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
      input[0].addEventListener('input', function () {
        input[0].value = input[0].value.replace(/[^0-9+() ]/ig, '');
      });

      statusMessage.classList.add('status');

  popupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    popupForm.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader ('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(popupForm);

    let obj = {};
    formData.forEach(function(value, key) {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++){
      input[i].value = '';
    }
  });

  let form = document.querySelector('#form'),
      input2 = form.getElementsByTagName('input'),
      statusMessage2 = document.createElement('div');
      input2[1].addEventListener('input', function () {
        input2[1].value = input2[1].value.replace(/[^0-9+() ]/ig, '');
      });

      statusMessage2.classList.add('status');
      statusMessage2.style.color = '#fff';

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.appendChild(statusMessage2);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader ('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key) {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
      if (request.readyState < 4) {
        statusMessage2.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage2.innerHTML = message.success;
      } else {
        statusMessage2.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++){
      input[i].value = '';
    }
  });

  
});