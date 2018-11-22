'use strict'
function rand(min, max) {
  return Math.ceil((max - min + 1) * Math.random()) + min - 1;
}

function generateId() {
  return Array(4).fill(1).map(value => rand(1000, 9999)).join('-');
}

const pointsInfo = [
  { title: 'Темная сторона Луны', coords: [500, 200, 97] },
  { title: 'Седьмое кольцо Юпитера', coords: [934, -491, 712] },
  { title: 'Саратов', coords: [30, 91, 77] }
];

//task1
console.log('===TASK1===\n')

class OrdersTeleportationPoint {
  constructor(title, x, y, z) {
    this.title = title;
    this.coords = [];
    this.coords[0] = x;
    this.coords[1] = y;
    this.coords[2] = z;
  }
  // AB = √(xb - xa)2 + (yb - ya)2 + (zb - za)2
  getDistance(x, y, z) {
    return Math.sqrt(
      Math.pow((x - this.coords[0]), 2) +
      Math.pow((y - this.coords[1]), 2) +
      Math.pow((z - this.coords[2]), 2)
    );
  }
}

const point = new OrdersTeleportationPoint('Темная сторона Луны', 500, 200, 97);
let distance = point.getDistance(100, -100, 33);
console.log(`Расстояние до пункта «${point.title}» составит ${distance.toFixed(0)} единиц`);

//task2
console.log('\n===TASK2===\n')

class OrdersTeleportationPointLocator {
  constructor(points) {
   if (!Array.isArray(points)) throw 'не массив';
    this.points = [];
    points.forEach((point) => {

      if (point instanceof OrdersTeleportationPoint) {
        this.points.push(point);
      }
    });

    this.distance = null;
  }
  getClosest(x, y, z) {
    let distanceArray = [];
    this.points.forEach(function (item) {
      distanceArray.push(item.getDistance(x, y, z));
    });
    return points[distanceArray.indexOf(Math.min.apply(this, distanceArray))];

  }
}
//const points = null;
const points = pointsInfo.map(point => new OrdersTeleportationPoint(point.title, ...point.coords));

try {
  const locator = new OrdersTeleportationPointLocator(points);
  const closestPoint = locator.getClosest(333, 294, 77);
  console.log(`Ближайший пункт телепортации заказов «${closestPoint.title}»`);
  const closestPointMy = locator.getClosest(935, -492, 710);
  console.log(`Ближайший пункт телепортации заказов «${closestPointMy.title}»`);
} catch (e) {
  console.log(e);
}


//task3
console.log('\n===TASK3===\n')

function LoyaltyCard(name, sumOrder) {
  this.sum = sumOrder;
  this.owner = name;
  this.id = generateId();
  this.balance = sumOrder;
  this.discount = 0;
  this.orders = [];
  this.orders.push(sumOrder);

  Object.defineProperty(this, 'id', { writable: false });

  this.getFinalSum = function (sumOrder) {
    let sumWithDiscount;
    if (this.balance < 3000) {
      this.discount = 0;
      sumWithDiscount = sumOrder - sumOrder * this.discount / 100;
    } else if (this.balance > 3000 && this.balance <= 5000) {
      this.discount = 3;
      sumWithDiscount = sumOrder - sumOrder * this.discount;
    } else if (this.balance > 5000 && this.balance <= 10000) {
      this.discount = 5;
      sumWithDiscount = sumOrder - sumOrder * this.discount / 100;
    } else if (this.balance > 10000) {
      this.discount = 7;
      sumWithDiscount = sumOrder - sumOrder * this.discount / 100;
    }
    return sumWithDiscount;
  }
  this.append = function (newOrderSum) {
    this.balance += newOrderSum;
    this.orders.push(newOrderSum);
    this.getFinalSum(newOrderSum);
    Object.defineProperty(this, 'discount', { writable: false });
    Object.defineProperty(this, 'balance', { writable: false });
  }
  this.show = function () {
    let ordersReport = '';
    this.orders.forEach((sum, index) => {
      ordersReport += `\n\t#${index + 1} на сумму ${sum} Q`;
    });

    console.log(`Карта ${this.id}: \n Владелец: ${this.owner} \n Баланс: ${this.balance} \n Текущая скидка: ${this.discount}% \n Заказы: ${ordersReport}\n`);
  }
}


const card = new LoyaltyCard('Иванов Иван', 6300);

let newOrderSum = 7000;
let finalSum = card.getFinalSum(newOrderSum);
console.log(`Итоговая сумма для заказа на ${newOrderSum} Q по карте
  составит ${finalSum} Q. Скидка ${card.discount} %.`);

card.append(newOrderSum);
console.log(`Баланс карты после покупки ${card.balance} Q.`);
card.show();
