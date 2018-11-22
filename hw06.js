'use strict'

var positions = [
  'Телепорт бытовой VZHIH-101',
  'Отвертка ультразвуковая WHO-D',
  'Ховерборд Mattel 2016',
  'Нейтрализатор FLASH black edition',
  'Меч световой FORCE (синий луч)'
];

var prices = [
  10000,
  4800,
  9200,
  2500,
  57000
];

var hitName = positions[2], hitPrice = prices[2];

// task1

const hit = {};

hit['name'] = hitName;
hit['price'] = hitPrice;

console.log(`Хит продаж мартобря: ${hit['name']} цена ${hit['price']} Q`);


//task 2
console.log('=========');

let items = [];

for (let i = 0; i < positions.length; i++) {
  items.push({ name: positions[i], price: prices[i] });
}

console.log(`Купите ${items[4].name} по цене ${items[4].price} Q`);


//task3
console.log('=========');

function showDiscount(good, cols) {
  let discountValue;
  if (cols < 10) {
    discountValue = 5;
  } else if (cols >= 10 && cols < 50) {
    discountValue = 7;
  } else if (cols >= 50 && cols < 100) {
    discountValue = 10;
  } else if (cols >= 100) {
    discountValue = 15;
  }

  const costBatch = cols * (good.price - good.price * discountValue / 100);
  const profit = cols * good.price - costBatch;

  console.log(`${good.name} стоимость партии из ${cols} штук ${costBatch} Q(скидка ${discountValue} %), ваша выгода ${profit} Q!`);
}

showDiscount(items[0], 12);
showDiscount(items[3], 97);


//task 4
console.log('=========');

items[0].amount = 17;
items[1].amount = 18;
items[2].amount = 1;
items[3].amount = 3;

function updateAmount(item, expend) {
  expend = expend === undefined ? 1 : expend;

  if (item.amount !== undefined) {
    if (item.amount > expend) {
      item.amount -= expend;
      console.log(`${item.name} — остаток ${item.amount} шт.`);
      return item.amount;
    } else if (item.amount === expend) {
      item.amount -= expend;
      console.log(`Это был последний ${item.name}, вам повезло!`);
      return item.amount;
    } else if (item.amount === 0 || item.amount < expend) {
      console.log(`${item.name} закончился на складе`);
      return item.amount;

    }
  }

}

updateAmount(items[1], 17);
updateAmount(items[3], 3);
updateAmount(items[3]);



