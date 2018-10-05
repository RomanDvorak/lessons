'use strict';

let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

for (let i = 0; i < week.length; i++) {
  if (week[i] == "Пятница") {
    document.write("<em>" + week[i] + "</em><br>");
  }
  else if (week[i] == "Суббота" || week[i] == "Воскресенье") {
    document.write("<strong>" + week[i] + "</strong><br>");
  }
  else {
    document.write(week[i] + "<br>");
  }
}

let arr = ["375", "8634", "2288", "7712", "5567", "33667", "7788"];

for (let i = 0; i < arr.length; i++) {
  let num = arr[i].slice(0, 1);
  if (num == 3 || num == 7) {
    document.write(arr[i] + "<br>");
  }
  else {
    continue;
  }
}