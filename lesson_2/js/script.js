'use strict';

let money = +prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD.");

let income = [];
let expenses = {};
let optionalExpenses = {};
let appData = {
  budget: money,
  timeData: time,
  expenses: expenses,
  optionalExpenses: '',
  income: income,
  savings: false
};
for (let i = 0; i < 2; i++) {
  let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
      b = prompt("Во сколько обойдётся?", "");
  
  if ( (typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null 
      && a != '' && b != '' && a.length < 50 ) {
      console.log("done");
      appData.expenses[a] = b;
  } else {
    console.log("error");
    i--;
  }
};



/* Второй вариант */
/* let i = 0;
do {
  let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
      b = prompt("Во сколько обойдётся?", "");
      if ( (typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null 
      && a != '' && b != '' && a.length < 50 ) {
      console.log("done");
      appData.expenses[a] = b;
      i++;
  } else {
    console.log("error");
    i--;
  }
}
   while(i < 2); */


   /* Третий способ */

   /* let i = 0;
   while(i < 2) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
    b = prompt("Во сколько обойдётся?", "");
    if ( (typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null 
    && a != '' && b != '' && a.length < 50 ) {
    console.log("done");
    appData.expenses[a] = b;
    i++;
   } else {
    console.log("error");
    i--;
  }
  } */


appData.moneyPerDay = appData.budget / 30;

alert("Ежедневный бюджет: " + appData.moneyPerDay);

if(appData.moneyPerDay < 100) {
  console.log("Минимальный уровень достатка");
} else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
  console.log("Средний уровень достатка");
} else if (appData.moneyPerDay >= 2000) {
  console.log("Высокий уровень достатка");
} else {
  console.log("Произошла ошибка");
}