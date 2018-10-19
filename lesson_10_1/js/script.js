'use strict';

class Options {
  constructor(height = '200px', width = '200px', bg = 'red', fontSize = '18px', textAlign = 'left') {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }
  createDiv() {
    let div = document.createElement('div');
    div.textContent = 'Это текст div.';
    div.style.cssText="background-color: "+this.bg+"; \ \
    width: "+this.width+"; \
    height: "+this.height+"; \
    font-size: "+this.fontSize+"; \
    text-align: "+this.textAlign+"; \
  ";
  document.body.appendChild(div);
  }
}
const square = new Options(undefined, undefined, 'blue');
square.createDiv();

class NewObj {
  createObj() {
    let obj = {
      search: function() {
        let element = document.querySelector('div');
      }
    };
    obj.search();
  }
}
let myElem = new NewObj();
myElem.createObj();