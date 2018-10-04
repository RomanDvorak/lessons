'use strict';

let budget = +prompt("Ваш бюджет на месяц?");
let nameOfShop = prompt("Название вашего магазина?");

let shopGoods = [];
let employers = {};
let mainList = {
  bud: budget,
  name: nameOfShop,
  shopGoods: shopGoods,
  employers: employers,
  open: true
};
for (let i = 0; i < 3; i++) {
  var answer = prompt("Какой тип товаров будем продавать?");
  shopGoods.push(answer);
};
document.write(budget / 30);