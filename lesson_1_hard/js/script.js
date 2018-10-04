'use strict';

let number = 33721;
let numLength = (''+number).length;

let num = 1;
for (let i = 0; i < numLength; i++) {
  num = num * number.toString()[i];
}
num = num ** 3;
console.log(num);

let numStr = num.toString();
document.write(numStr.substring(0, 2));