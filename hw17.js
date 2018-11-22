'use strict'
function rand(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function getTagAsync(title, cb) {
  setTimeout(() => {
    const tags = JSON.parse('[{"id":17,"title":"перемещение"},{"id":32,"title":"гаджеты"}]');
    const tag = tags.find(tag => tag.title === title);
    if (!tag) {
      return cb(`Тег #${title} не найден`);
    }
    cb(null, tag);
  }, rand(2000, 5000));
}

function getTag(title) {
  return new Promise((done, fail) => {
    getTagAsync(title, (err, tag) => {
      if (err) {
        return fail(err);
      }
      done(tag);
    })
  });
}

function getTagItemsAsync(tagId, cb) {
  setTimeout(() => {
    const tagItems = new Map(JSON.parse('[[17,[{"title":"Телепорт бытовой VZHIH-101","price":10000,"discount":7,"available":3},{"title":"Ховерборд Mattel 2016","price":9200,"discount":4,"available":14}]],[32,[{"title":"Ховерборд Mattel 2016","price":9200,"discount":4,"available":14},{"title":"Меч световой FORCE (синий луч)","price":57000,"discount":0,"available":1}]]]'));
    if (tagItems.has(tagId)) {
      cb(null, tagItems.get(tagId));
    } else {
      cb(new Error(`Тег #ID${tagId} не найден`));
    }
  }, rand(2000, 5000));
}

function getTagItems(tagId) {
  return new Promise((done, fail) => {
    getTagItemsAsync(tagId, (err, items) => {
      if (err) {
        return fail(err);
      }
      done(items);
    })
  });
}

function getCurrencyRateAsync(code, cb) {
  setTimeout(() => {
    const rates = new Map(JSON.parse('[["AUD", 44.95],["AZN", 33.73],["GBP", 73.42],["AMD", 0.12],["BYN",30.96],["BGN",32.01],["BRL",18.8],["HUF",0.2],["DKK",8.42],["USD",58.85],["EUR",62.68],["INR",0.88],["KZT",0.18],["CAD",44.74],["KGS",0.85],["CNY",8.55],["MDL",2.94],["NOK",7.02],["PLN",14.55],["RON",13.92],["ZZZ",79.91],["SGD",41.36],["TJS",7.43],["TRY",15.97],["TMT",16.84],["UZS",0.02],["UAH",2.16],["CZK",2.32],["SEK",6.6],["CHF",58.69],["ZAR",4.4],["KRW",0.05],["JPY",0.52]]'));
    if (!rates.has(code)) {
      return cb(new Error(`Валюта с кодом ${code} не найдена`));
    }
    cb(null, rates.get(code));
  }, rand(2000, 5000));
}

const tags = [
  { id: 17, title: 'перемещение' },
  { id: 32, title: 'гаджеты' }
];
const badTag = { id: 54, title: 'ошибка' };
const tagTitle = 'гаджеты';

//task1

function showTagInfo(tag) {
  getTagItemsAsync(tag.id, (err, name) => {
    if (err) {
      console.log(`[${err}]`);
    } else {
      let result = `\nТовары по тегу #${tag.title}:`;
      name.forEach((item) => {
        result += `\n* ${item.title}: ${item.price}Q`;
      });
      console.log(`task1: ${result}`);
    }
  });

}

tags.forEach(showTagInfo);
showTagInfo(badTag);

//task2

function getCurrencyRate(code) {
  const promise = new Promise((resolve, reject) => {
    getCurrencyRateAsync(code, (error, rates) => {
      error ? reject(error) : resolve(rates);
    });
  });
  return promise;
}

function convertCurrency(amount, fromCode, toCode) {
  return new Promise((resolve, reject) => {
    const promise1 = getCurrencyRate(fromCode);
    const promise2 = getCurrencyRate(toCode);
    Promise.all([promise1, promise2]).then(values => {
        let result = Math.round(amount * values[0] / values[1]);
        resolve(result);
      });
  });
}



const amount = 42;
convertCurrency(amount, 'ZZZ', 'USD')
  .then(result => console.log(`task2: ${amount}Q = $${result}`))
  .catch(err => console.error(err));

convertCurrency(amount, 'XXX', 'USD')
  .then(result => console.log(`task2: ${amount}X = $${result}`))
  .catch(err => console.error(err));


//task3

function getTagItemsCountAsync(title, callback) {
  getTagAsync(title, (error, tag) => {
    if (!error) {
      getTagItemsAsync(tag.id, (error, count) => {
        callback(error, count.length);
      });
    } else {
      callback(error);
    }
  });
}

getTagItemsCountAsync(tagTitle, (err, count) => {
  if (err) {
    return console.error(err);
  }
  console.log(`task3: По тегу #${tagTitle} найдено товаров ${count} шт.`);
});

//task4


function getTagItemsCount(title) {
  return getTag(title)
    .then(good => getTagItems(good.id))
    .then(count => count.length);
}



getTagItemsCount(tagTitle)
  .then(count => console.log(`task4: По тегу #${tagTitle} найдено товаров ${count} шт.`))
  .catch(err => console.error(err));


