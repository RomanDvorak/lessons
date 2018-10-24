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
    loading: '<div class="status-ico-div"><img src="icons/loading.svg" class="status-ico" alt="loading"><span class="status-ico-div-span">Идёт загрузка, подождите...</span></div>',
    success: '<div class="status-ico-div"><img src="icons/checked.svg" class="status-ico" alt="checked"><span class="status-ico-div-span">Заявка успешно оставлена, мы вам перезвоним!</span></div>',
    failure: '<div class="status-ico-div"><img src="icons/error.svg" class="status-ico" alt="fail"><span class="status-ico-div-span">Произошла ошибка, повторите попытку!</span></div>'
  };

  let popupForm = document.querySelector('.main-form'),
      popupInput = popupForm.getElementsByTagName('input'),
      form = document.querySelector('#form'),
      formInput = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
      popupInput[0].addEventListener('input', function () {
        popupInput[0].value = popupInput[0].value.replace(/[^0-9+() ]/ig, '');
      });
      formInput[1].addEventListener('input', function () {
        formInput[1].value = formInput[1].value.replace(/[^0-9+() ]/ig, '');
      });

      statusMessage.classList.add('status');
      statusMessage.classList.add('status-ico-div');

  function sendForm(elem) {
    elem.addEventListener('submit', function(event) {
      event.preventDefault();
      let input = elem.getElementsByTagName('input');
      elem.appendChild(statusMessage);
      let formData = new FormData(elem);

      function postData(data) {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();

          request.open("POST", 'server.php');

          request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

          request.onreadystatechange = function(){
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status == 200) {
              if(request.status == 200 && request.status < 300) {
                resolve();
              } else {
                reject();
              }
            }
          };
            request.send(data);
        });
      } // End postData

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      postData(formData)
        .then(()=> statusMessage.innerHtml = message.loading)
        .then(()=> statusMessage.innerHTML = message.success)
        .catch(()=> statusMessage.innerHTML = message.failure)
        .then(clearInput);
    });
  }
  sendForm(popupForm);
  sendForm(form);


  // Slider

  let slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);

  function showSlides(n) {

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function() {
    plusSlides(-1);
  });
  
  next.addEventListener('click', function() {
    plusSlides(1);
  });
  
  dotsWrap.addEventListener('click', function(event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
        currentSlide(i);
      }
    }
  });

  // Calc

  let persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue= document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0;

      totalValue.innerHTML = 0;

      persons.addEventListener('input', function() {
        persons.value = persons.value.replace(/\D/g, '');
    });
      persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(restDays.value == '' || persons.value == '' || persons.value == '0' || restDays.value == '0') {
          totalValue.innerHTML = 0;
        } else {
          totalValue.innerHTML = total;
        }
      });

      restDays.addEventListener('input', function() {
        restDays.value = restDays.value.replace(/\D/g, '');
    });

      restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(persons.value == '' || restDays.value == '' || persons.value == '0' || restDays.value == '0') {
          totalValue.innerHTML = 0;
        } else {
          totalValue.innerHTML = total;
        }
      });

      place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '' || persons.value == '0' || restDays.value == '0') {
          totalValue.innerHTML = 0;
        } else {
          let a = total;
          totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
      });

});