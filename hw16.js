'use strict';
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  function colorToHex(color) {
    let hex = Math.round(color * 255).toString(16);
    return hex.length < 2 ? `0${hex}` : hex;
  }

  const color = [r, g, b].map(colorToHex).join('');
  return `#${color}`;
}

class Order {
  constructor(id, weight) {
    this.id = id;
    this.weight = weight;
  }
}

class Truck extends Array {
  constructor(number, weightLimit) {
    super();
    this.number = number;
    this.weightLimit = weightLimit;
  }

  add(order) {
    if (!this.isFit(order)) {
      return false;
    }
    this.push(order);
    return true;
  }

  isFit(order) {
    return this.weightLimit >= (this.totalWeight + order.weight);
  }

  get totalWeight() {
    return this.reduce((total, order) => total + order.weight, 0);
  }

  show() {
    console.log(`Машина №${this.number} (общий вес груза ${this.totalWeight}кг):`);
    this.forEach(order => console.log(`\tЗаказ #${order.id} ${order.weight}кг`));
  }
}//task1
console.log('===TASK1====\n')
function* palette(amount) {
  for (let i = 0; i < amount; i++) {
    const h = Math.floor(Math.random() * 121);
    const s = (h + 120);
    const l = (s + 120);
    yield hslToRgb(h / 360, s / 360, l / 360);
  }
}

for (const color of palette(3)) {
  console.log(color);
}
//TASK2
console.log('\n===TASK2====\n')

function* numberQuiz(number) {
  let result = yield 'Назовите число:';
  while (1) {
    if (number === result) {
      //result.done = false;\
      return `Вы угадали, это ${result}`;
    } else if (number > result) {
      //result.done = false;
      result = yield `Больше, чем ${result}`;
    } else {
      //result.done = true;
      result = yield `Меньше, чем ${result}`;
    }
  }
  //return result;
}

const attempts = [7, 4, 6, 5];
const quiz = numberQuiz(5);
let attempt, result;
do {
  result = quiz.next(attempt);
  console.log(result.value);
  attempt = attempts.shift();
} while (!result.done);

//второй пример
const attempts2 = [1, 7, 6, 5];
const quiz2 = numberQuiz(5);
do {
  result = quiz2.next(attempt);
  console.log(result.value);
  attempt = attempts2.shift();
} while (!result.done);


//TASK3
console.log('\n===TASK3====\n')

class TruckPlanner{
  constructor(weightLimit){
    this.weightLimit = weightLimit;
    this.trucks = [];
  }

  add(order) {
    let truckNumber = this.trucks.length;
    if(truckNumber === 0){
      this.trucks.push(new Truck(1, this.weightLimit));
      this.trucks[0].add(order);
    }else{
      if(!this.trucks[truckNumber-1].add(order)){
        this.trucks.push(new Truck(truckNumber + 1, this.weightLimit));
        this.trucks[truckNumber].add(order);
      }
    }
  }
}

TruckPlanner.prototype[Symbol.iterator] = function* (){
  for(let i = 0; i < this.trucks.length; i++){
      yield this.trucks[i];
    }
}


const planner = new TruckPlanner(10);
planner.add(new Order(1, 2));
planner.add(new Order(2, 5));
planner.add(new Order(3, 4));
planner.add(new Order(4, 4));
planner.add(new Order(5, 1));
planner.add(new Order(6, 2));

for (const truck of planner) {
  truck.show();
}