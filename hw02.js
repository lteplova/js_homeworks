'use strict'

//task 1
var productColsStock = 9;
var productColsBasket = 9;

if (productColsBasket > productColsStock) {
  console.log(`На складе нет такого количества товаров.`);
} else if (productColsBasket === productColsStock) {
  console.log(`Вы забираете весь товар c нашего склада!`);
} else {
  console.log(`Заказ оформлен`);
}

//task 2

var area;
var costDelivery;

area = 'Звезда смерти';

switch (area) {
  case 'Луна':
    costDelivery = 150;
    console.log(`Стоимость доставки для области ${area}: ${costDelivery} Q`);
    break;
  case 'Крабовидная туманность':
    costDelivery = 250;
    console.log(`Стоимость доставки для области ${area}: ${costDelivery} Q`);
    break;
  case ' Галактика Туманность Андромеды':
    costDelivery = 550;
    console.log(`Стоимость доставки для области ${area}: ${costDelivery} Q`);
    break;
  case 'Туманность Ориона':
    costDelivery = 660;
    console.log(`Стоимость доставки для области ${area}: ${costDelivery} Q`);
    break;
  case 'Звезда смерти':
    costDelivery = 'договорная цена';
    console.log(`Стоимость доставки для области ${area}: ${costDelivery} Q`);
    break;
  default: console.log(`В ваш квадрант доставка не осуществляется`);
}

//task 3

var productPrice = '1l';

try {
  if (typeof (productPrice) !== 'number') {
    throw 'не является числом';
  }
  console.log('Цена товара введена корректно.');

} catch (err) {
  console.log(`Вы допустили ошибку: ${productPrice} ${err}`);
}

//task 4

var residentAddress = 'Юпитер';
var age = 121;

if (residentAddress === 'Земля') {
  if (age > 18) {
    console.log(`Приятных покупок`);
  }
  else console.log('Вы не достигли совершеннолетия');

} else if (residentAddress === 'Юпитер') {
  if (age > 120) {
    console.log(`Чистого неба и удачных покупок!`);
  }
  else console.log('Сожалеем. Вернитесь на 120-й день рождения!');
} else {
  console.log(`Спасибо, что пользуетесь услугами нашего магазина!`);
}