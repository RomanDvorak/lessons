let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector(".choose-income"),
    checkSavings = document.querySelector("#savings"),
    sumValue = document.querySelector(".choose-sum"),
    percentValue = document.querySelector(".choose-percent"),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');



let money, time;


countBtn.disabled = true;
sumValue.disabled = true;
percentValue.disabled = true;
checkSavings.disabled = true;


startBtn.addEventListener('click', function() {
  time = prompt("Введите дату в формате YYYY-MM-DD.");
  money = +prompt("Ваш бюджет на месяц?");

  while(isNaN(money) || money == '' || money == null) {
    money = +prompt("Ваш бюджет на месяц?");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
  countBtn.disabled = false;
});

expensesBtn.addEventListener('click', function() {
  let count = 0;
  for (let i = 0; i <= expensesItem.length; i++) {
    if (count == expensesItem.length) {
      let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value,
          b = expensesItem[++i].value;
    
    if ( (typeof(a))=== 'string' && a != null && b != null 
        && a != '' && b != '' && a.length < 50 ) {
        console.log("done");
        appData.expenses[a] = b;
        sum += +b;
        checkSavings.disabled = false;
    } else {
      console.log("error");
      i--;
    }
  }
  expensesValue.textContent = sum;
    }
    else if (expensesItem[i].value != '') {
      count++;
    }
    else {
      continue;
    }
  }
});
optionalExpensesBtn.addEventListener('click', function() {
  let text = '';
  for (let i = 0; i < optionalExpensesItem.length; i++) {
      let opt = optionalExpensesItem[i].value;
    
      appData.optionalExpenses[i] = opt;
      text += opt + ' ';
      if(i == (optionalExpensesItem.length-1)) {
        optionalExpensesValue.textContent = text;
      }
  }
});

countBtn.addEventListener('click', function() {
  if (appData.budget != undefined) {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
  dayBudgetValue.textContent = appData.moneyPerDay;

  if(appData.moneyPerDay < 100) {
    levelValue.textContent ="Минимальный уровень достатка";
  } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
    levelValue.textContent ="Средний уровень достатка";
  } else if (appData.moneyPerDay >= 2000) {
    levelValue.textContent ="Высокий уровень достатка";
  } else {
    levelValue.textContent ="Произошла ошибка";
  }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка";
  }
});

incomeItem.addEventListener('input', function() {
  let items = incomeItem.value;
  appData.income = items.split(', ');
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
  if (appData.savings == true) {
    appData.savings = false;
    sumValue.disabled = true;
    percentValue.disabled = true;
  } else {
    appData.savings = true;
    sumValue.disabled = false;
    percentValue.disabled = false;
  }
});

sumValue.addEventListener('input', function() {
  if (appData.savings == true) {
    let sum = +sumValue.value -(+expensesValue.textContent),
        percent = +percentValue.value;
    appData.monthIncome = (sum-(+expensesValue.textContent))/100/12*percent;
    appData.yearIncome = (sum-(+expensesValue.textContent))/100*percent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

percentValue.addEventListener('input', function() {
  if (appData.savings == true) {
    let sum = +sumValue.value -(+expensesValue.textContent),
        percent = +percentValue.value;
        appData.monthIncome = (sum-(+expensesValue.textContent))/100/12*percent;
        appData.yearIncome = (sum-(+expensesValue.textContent))/100*percent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});


let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
};


function fullAppData() {
  for (let key in appData) {
    console.log("Свойство " + key + " имеет значение " + appData[key]);
  }
};

for (let i = 0; i < expensesItem.length; i++) {
  if (i % 2 == 0) {
  expensesItem[i].addEventListener('input', function () {
    expensesItem[i].value = expensesItem[i].value.replace(/[^а-яА-ЯёЁ -]/ig, '');
  });
} else {
  expensesItem[i].addEventListener('input', function () {
    expensesItem[i].value = expensesItem[i].value.replace(/[^0-9 -]/ig, '');
  });
}
}

for (let i = 0; i < optionalExpensesItem.length; i++) {
  optionalExpensesItem[i].addEventListener('input', function () {
    optionalExpensesItem[i].value = optionalExpensesItem[i].value.replace(/[^а-яА-ЯёЁ -]/ig, '');
  });
}