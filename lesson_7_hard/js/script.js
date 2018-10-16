let btn = document.querySelector('.start')
    square = document.querySelector('.square');

function myAnimation() {
  let pos = 0;

  let id1 = requestAnimationFrame(frameRightDown);
  function frameRightDown () {
    if (pos == 250) {
      clearInterval(id1);
      let id2 = requestAnimationFrame(frameLeft);
    } else {
      pos += 5;
      square.style.left = pos + 'px';
      square.style.top = pos + 'px';
      id1 = requestAnimationFrame(frameRightDown);
    }
  }
  function frameLeft () {
    if (pos == 50) {
      clearInterval(id2);
      pos = +((square.style.top).slice(0,-2));
      let id3 = requestAnimationFrame(frameTop);
    } else {
      pos -= 5;
      square.style.left = pos + 'px';
      id2 = requestAnimationFrame(frameLeft);
    }
  }
  function frameTop () {
    if (pos == 150) {
      clearInterval(id3);
      pos = +((square.style.left).slice(0,-2));
      let id4 = requestAnimationFrame(frameCenter);
    } else {
      pos -= 5;
      square.style.top = pos + 'px';
      id3 = requestAnimationFrame(frameTop);
    }
  }
  function frameCenter () {
    if (pos == 150) {
      clearInterval(id4);
    } else {
      pos += 5;
      square.style.left = pos + 'px';
      id4 = requestAnimationFrame(frameCenter);
    }
  }


}

btn.addEventListener('click', myAnimation);