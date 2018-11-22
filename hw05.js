'use strict';
// task1

let commonTax = 0;
let priceGoods;
const TAX_VALUE = 0.73

function calcTax(priceGoods) {
  let tax = priceGoods * TAX_VALUE;
  commonTax += tax;
  return commonTax;
}

calcTax(1000);
calcTax(1200);
calcTax(2000);
calcTax(25000);

console.log(`Налог с продаж (${TAX_VALUE * 100}%), к оплате: ${commonTax} Q`);

console.log('========');

//task2
let amountPack = 30;

function possibilityPack(width, height, length) {
  let squarePack = 2 * width * height + 2 * width * length + 2 * height * length;
  if (squarePack <= amountPack) {
    amountPack -= squarePack;
    return true;
  }
  return false;
}


function runPack(width, height, length) {
  const resultpack = possibilityPack(width, height, length);
  if (resultpack) {
    console.log(`Заказ (${width}/${height}/${length} м) упакован, осталось упаковочной бумаги ${amountPack} м2`);
  } else {
    console.log(`Заказ(${width} / ${height} / ${length} м) не упакован, осталось упаковочной бумаги ${amountPack} м2`);
  }

}

runPack(0.5, 1, 3);
runPack(2, 0.5, 3);
runPack(2, 0.5, 3);

console.log('========');

//task3

'use strict';

const energyVolume = [7, 2, 1, 4, 8];
const counters = [];

for (let i = 0; i < energyVolume.length; i++) {

  let counter = function cnt() {
    const currentVal = energyVolume[i];
    if (currentVal > 1) {
      console.log(`Телепорт ${i + 1} использован, заряд — ${currentVal - 1} единиц`);
      energyVolume[i]--;

    } else if (currentVal === 1) {

      console.log(`Телепорт ${i + 1} использован, заряд — ${currentVal - 1} единиц, требуется перезарядка`);
      energyVolume[i]--;
    } else {
      console.log(`Телепорт ${i + 1} недоступен, перезаряжается`);
    }

  };
  counters.push(counter);
}

counters[1]();
counters[2]();
counters[3]();
counters[4]();
counters[1]();
counters[2]();









