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
let a1 = prompt("Введите обязательную статью расходов в этом месяце", ""),
    a2 = prompt("Во сколько обойдётся?", ""),
    a3 = prompt("Введите обязательную статью расходов в этом месяце", ""),
    a4 = prompt("Во сколько обойдётся?", "");
appData.expenses.a1 = a2;
appData.expenses.a3 = a4;

document.write(money / 30);