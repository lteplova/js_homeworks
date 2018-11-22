'use strict';

//task 1
console.log('===TASK1===');

function showSpecialPrice() {
  console.log('Введен секретный код. Все цены уменьшены вдвое!');
}

function fixAmount(amount) {

  if (typeof amount === 'string') {
    amount = amount.replace(/,/g, '.').trim().split(/\s+/);
    for (let i in amount) {
      if (parseInt(amount[i])) {
        return amount[i];
      }
    }
  }
  return parseInt(amount) ? amount : -1;
}

const orders = [
  { price: 21, amount: 4 },
  { price: 50, amount: '17    штук' },
  { price: 2, amount: 'штук 7' },
  { price: 7, amount: '1,5 килограмма' },
  { price: 2, amount: ' 2.7 метра ' },
  { price: 1, amount: 'семь единиц' }
];

for (let order of orders) {
  let result = fixAmount(order.amount);
  console.log(`Заказ на сумму: ${result * order.price} Q`);
}

//task2
console.log('===TASK2===');

const SECRET_WORD = 'r2d2';
let charBuffer = '';
function handleKey(char) {
  charBuffer += char.toLowerCase();
  if (charBuffer.slice(-4) === SECRET_WORD) {
    return showSpecialPrice();
  }
}
var keys = ['2', '4', 'R', '2', 'd', '2'];
for (let key of keys) {
  handleKey(key);
}

//task3
console.log('===TASK3===');

const data = [
  '12,Телепорт бытовой VZHIH-101 ,17,10000',
  '77, Меч световой FORCE (синий луч), 2,57000'
];

function parseData(cells, data, separator = ',') {
  let parseResult = [];
  for (let item of data) {
    let rowResult = {};
    let row = item.split(separator);

    if (cells.length != row.length) return false;

    for (let i in cells) {
      const cell = cells[i];
      rowResult[cell] = row[i].trim();
    }
    parseResult.push(rowResult);
  }
  return parseResult;
}

let items = parseData(['id', 'name', 'amount', 'price'], data);
console.log(items);