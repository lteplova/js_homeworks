'use strict';

let positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    producer: {
      name: 'Рязанский телепортостроительный завод',
      deferPeriod: 10,
      lot: 3
    },
    price: 10000
  },

  {
    title: 'Ховерборд Mattel 2016',
    producer: {
      name: 'Волжский Ховерборд Завод',
      deferPeriod: 24,
      lot: 14
    },
    price: 9200
  },

  {
    title: 'Меч световой FORCE (синий луч)',
    producer: {
      name: 'Тульский оружейный комбинат',
      deferPeriod: 5,
      lot: 1
    },
    price: 57000
  }
];


//task1

function lotCalculator(positions, colsItem) {
  let colsPart = Math.ceil(colsItem / positions.producer.lot);
  let costGoods = colsPart * positions.producer.lot * positions.price;
  const result = {
    lot: colsPart,
    total: costGoods
  }
  return result;
}

let result1 = lotCalculator(positions[1], 15);
console.log(`${positions[1].title} 15 штук: заказать партий ${result1.lot}, стоимость ${result1.total} Q`);
let result2 = lotCalculator(positions[2], 1);
console.log(`${positions[2].title} 1 штук: заказать партий ${result2.lot}, стоимость ${result2.total} Q`);


console.log('=========');

//task2
const deferedPayments = [];

function deferPay(producer, amount, argDate) {
  const paymentDate = new Date(argDate);
  paymentDate.setDate(paymentDate.getDate() + producer.deferPeriod);
  const result = {
    producer,
    paymentDate,
    amount
  };
  deferedPayments.push(result);
}

deferPay(positions[0].producer, 7200, new Date(2030, 4 - 1, 10));
console.log(`${deferedPayments[0].paymentDate.toLocaleDateString('ru-Ru')}: ${deferedPayments[0].producer.name}, сумма ${deferedPayments[0].amount} Q`);

deferPay(positions[1].producer, 14600, new Date(2030, 4 - 1, 24));
console.log(`${deferedPayments[1].paymentDate.toLocaleDateString('ru-Ru')}: ${deferedPayments[1].producer.name}, сумма ${deferedPayments[1].amount} Q`);

console.log('=========');


//task3
function loadCurrencyJSON() {
  return '{"AUD":44.95,"AZN":33.73,"GBP":73.42,"AMD":0.12,"BYN":30.96,"BGN":32.01, "BRL":18.8,"HUF":0.2,"DKK":8.42,"USD":58.85,"EUR":62.68,"INR":0.88,"KZT":0.18, "CAD":44.74,"KGS":0.85,"CNY":8.55,"MDL":2.94,"NOK":7.02,"PLN":14.55,"RON":13.92, "ZZZ":79.91,"SGD":41.36,"TJS":7.43,"TRY":15.97,"TMT":16.84,"UZS":0.02,"UAH":2.16, "CZK":2.32,"SEK":6.6,"CHF":58.69,"ZAR":4.4,"KRW":0.05,JPY:0.52}';
}

function convertCurrency(amount, from, to) {
  let rate;
  if (loadCurrencyJSON()) {
    try {
      rate = JSON.parse(loadCurrencyJSON());
    } catch (e) {
      console.error(`JSON invalid ${e}`);
      return;
    }

  }

  return (Math.round((amount * rate[from] / rate[to]) * 100) / 100);
}


let price1 = convertCurrency(7000, 'ZZZ', 'USD');
console.log(`Сумма ${price1} USD`);
// // Сумма 9505.01 USD

let price2 = convertCurrency(790, 'EUR', 'ZZZ');
console.log(`Сумма ${price2} ZZZ`);
// // Сумма 619.66 ZZZ