let btn = document.querySelector('.start')
    square = document.querySelector('.square');

function myAnimation() {
  let pos = 0;

  let id = requestAnimationFrame(frame);
  function frame () {
    if (pos == 250) {
      clearInterval(id);
    } else {
      pos++;
      square.style.left = pos + 'px';
      square.style.top = pos + 'px';
      id = requestAnimationFrame(frame);
    }
  }
}

btn.addEventListener('click', myAnimation);