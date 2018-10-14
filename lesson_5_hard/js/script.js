'use strict';

let input1 = document.querySelector("#first"),
    input2 = document.querySelector("#second"),
    input3 = document.querySelector("#third");


makebr();
makebr();

let date=new Date();

let s = date.getSeconds().toString();
if (s.length<2) s='0'+s;

let minutes = date.getMinutes().toString();
if (minutes.length<2) minutes='0'+minutes;

let hours = date.getHours().toString();
if (hours.length<2) hours='0'+hours;

let month = (date.getMonth()+1).toString();
if (month.length<2) month='0'+month;

let day = date.getDate().toString();
if (day.length<2) day='0'+day;

let year = date.getFullYear();
makebr();
makebr();
write(hours+'.'+minutes+'.'+s+ ' '+day+'.'+month+'.'+year);

makebr();

let dayOfWeek = date.getDay();

if(dayOfWeek == 1) {
  write("Сегодня понедельник!");
} else if(dayOfWeek == 2) {
  write("Сегодня вторник!");
} else if(dayOfWeek == 3) {
  write("Сегодня среда!");
} else if(dayOfWeek == 4) {
  write("Сегодня четверг!");
} else if(dayOfWeek == 5) {
  write("Сегодня пятница!");
} else if(dayOfWeek == 6) {
  write("Сегодня суббота!");
} else {
  write("Сегодня воскресенье!");
}

input1.addEventListener("input", function() {
  if(input1.value != ''  && input2.value != '') {
    let date1 = new Date(input1.value);
    let date2 = new Date(input2.value);
    let daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    input3.value = daysLag;
  }
});
input2.addEventListener("input", function() {
  if(input1.value != ''  && input2.value != '') {
    let date1 = new Date(input1.value);
    let date2 = new Date(input2.value);
    let daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    input3.value = daysLag;
  }
});


function write(val) {
  document.write(val);
}

function makebr() {
  document.write("<br>");
}