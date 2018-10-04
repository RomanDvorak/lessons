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
  var answer1 = prompt("Введите обязательную статью расходов в этом месяце.");
  var answer2 = prompt("Во сколько обойдется?");
  /* shopGoods.push(answer); */
  if (i == 0) {
    expenses.first = answer1;
    expenses.second = answer2;
  }
  else {
    expenses.third = answer1;
    expenses.fourth = answer2;
  }
};
document.write(money / 30);