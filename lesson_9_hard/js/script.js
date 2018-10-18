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
  let deadline = '2018-10-18';

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
      document.body.style.overflow = 'hidden';
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

});