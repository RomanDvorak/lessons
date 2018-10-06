'use strict';

let money = +prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD.");

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
};
let a1 = prompt("Введите обязательную статью расходов в этом месяце", ""),
    a3 = prompt("Во сколько обойдётся?", ""),
    a2 = prompt("Введите обязательную статью расходов в этом месяце", ""),
    a4 = prompt("Во сколько обойдётся?", "");
appData.expenses[a1] = a3;
appData.expenses[a2] = a4;
console.log(appData.expenses);

document.write(money / 30);