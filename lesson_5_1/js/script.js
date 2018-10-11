let menuItem = document.getElementsByClassName('menu-item'),
    menuWrap = document.getElementsByClassName('menu')[0],
    title = document.getElementsByClassName("title")[0],
    col2 = document.getElementsByClassName("column")[1],
    adv = col2.getElementsByClassName("adv")[0],
    promptBlock = document.getElementById("prompt");

menuWrap.insertBefore(menuItem[2], menuItem[1]);

let newItem = document.createElement("li");
newItem.classList = 'menu-item';
newItem.textContent = 'Пятый пункт'
menuWrap.appendChild(newItem);

document.body.style.backgroundImage = 'url(img/apple_true.jpg)';


title.textContent = 'Мы продаем только подлинную технику Apple';

col2.removeChild(adv);

let answ = prompt('Ваше отношение к технике Apple?');
promptBlock.textContent = answ;