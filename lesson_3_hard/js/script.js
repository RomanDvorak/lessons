'use strict';

let str = 'урок-3-был слишком легким';

let newStr = str[0].toUpperCase() + str.slice(1);
write(newStr);

let newStr2 = newStr.replace(/-/g, " ");
console.log(newStr2);

let word = newStr2.slice(19);
makebr();
write(word);

let newWord = word.replace("им", "оо");
makebr();
write(newWord);


let arr = new Array(20, 33, 1, 'Человек', 2, 3);
arr.splice(arr.indexOf('Человек'), 1);

let newArr = [];
for(let i = 0; i < arr.length; i++) {
  let cube = arr[i] * arr[i] * arr[i];
  newArr.push(cube);
}

let arrSum = arraySum(newArr);
let arrSqrt = Math.sqrt(arrSum);
console.log(arrSqrt);

let text = "Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Они назад но текстов? Силуэт которое там сих послушавшись своего путь, единственное все пор дал алфавит, текст продолжил жизни подзаголовок страну, предупреждал переписали инициал семантика! Грамматики языкового своих от всех взобравшись, имеет свое журчит возвращайся мир над коварный точках переулка большого заглавных! Себя ручеек но своего повстречался одна, пояс семантика несколько.";
checkVal(text);


function checkVal(val) {
  if(typeof(val) == "string") {
    let str = val.trim();
    if (str.length > 50) {
      str = str.slice(0, 50) + '...';
      makebr();
      write(str);
    }

  } else {
    alert("Значение не является строкой!");
  }
}


function arraySum(array){
  let sum = 0;
  for(let i = 0; i < array.length; i++){
      sum += array[i];
      }
  return sum;
  }

function makebr() {
  document.write("<br>");
}

function write(val) {
  document.write(val);
}