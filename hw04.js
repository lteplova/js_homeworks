'use strict'

//task1



function warrantyPrice(garantPeriod) {

  if (garantPeriod === 1) {
    console.log(`Дополнительное гарантийное обслуживание: 1250 Q`);
  } else if (garantPeriod === 2) {
    console.log(`Дополнительное гарантийное обслуживание: 2300 Q`);
  } else {
    console.log(`Дополнительное гарантийное обслуживание не предусмотрено`);
  }

}

warrantyPrice(1);

//task2


function calcCost(etchingText) {
  if (!etchingText || etchingText.trim().length === 0) {
    console.log(`Цена гравировки равна 0 Q`); //использовала trim для обрезания пробелов
  } else {
    var etchingArr = etchingText.trim().split(/\s+/);
    var colsWords = etchingArr.length;
    var oneWordPrice = 10;
    var totalPrice = oneWordPrice * colsWords;
    console.log(`Подарочная упаковка и гравировка: ${totalPrice} Q`);
  }

}

calcCost('Поздравляю, дорогой товарищ!');

//task3


function delivery(needDelivery, area) {
 var costDelivery;
  if (needDelivery === false) {
    return 0;
  } else {
    switch (area) {
      case 'Луна':
        costDelivery = 150;
        return `Стоимость доставки для области ${area}: ${costDelivery} Q`;
        break;
      case 'Крабовидная туманность':
        costDelivery = 250;
        return `Стоимость доставки для области ${area}: ${costDelivery} Q`;
        break;
      case 'Галактика Туманность Андромеды':
        costDelivery = 550;
        return `Стоимость доставки для области ${area}: ${costDelivery} Q`;
        break;
      case 'Туманность Ориона':
        costDelivery = 660;
        return `Стоимость доставки для области ${area}: ${costDelivery} Q`;
        break;
      case 'Звезда смерти':
        costDelivery = 'договорная цена';
        return `Стоимость доставки для области ${area}: ${costDelivery}`;
        break;

      default: return NaN;
    }
  }

}

var resultDelivery = delivery(true, 'Туманность Ориона');
if (resultDelivery === 0) {
  console.log(`Доставка не требуется`);
} else if (!resultDelivery) {
  console.log(`Ошибка при расчете стоимости доставки`);
} else {
  console.log(resultDelivery);
}






