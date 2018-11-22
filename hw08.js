"use strict";

var positions = [
  {
    title: "Телепорт бытовой VZHIH-101",
    price: 10000,
    discount: 7,
    available: 3
  },
  {
    title: "Ховерборд Mattel 2016",
    price: 9200,
    discount: 4,
    available: 14
  },
  {
    title: "Меч световой FORCE (синий луч)",
    price: 57000,
    discount: 0,
    available: 1
  }
];

//task 1
console.log("==== TASK 1 ====");
const itemPrototype = {
  hold(amount = 1) {
    if (this.available < amount) {
      return false;
    }
    this.available -= amount;
    this.holded += amount;
    return true;
  },
  unhold(amount) {
    if (amount && this.holded < amount) {
      return false;
    }
    if (!amount) {
      this.available += this.holded;
      this.holded -= this.holded;
      return true;
    }
    this.available += amount;
    this.holded -= amount;
    return true;
  },
  toString() {
    return `${this.title} (остаток ${this.available}, в резерве ${
      this.holded
      })`;
  }
};

function createItem(title, amount) {
  const item = Object.create(itemPrototype);
  item.title = title;
  item.available = amount;
  item.holded = 0;
  return item;
}

const items = [];
for (let item of positions) {
  items.push(createItem(item.title, item.available));
}

items[0].hold(2);
items[1].hold(8);
items[1].hold(12);
items[2].hold(1);

for (let item of items) {
  console.log(`Товар ${item}`);
}
console.log("=======");

console.log(`Товар ${items[0]}`);
// Товар Телепорт бытовой VZHIH-101 (остаток 1, в резерве 2)
items[0].unhold(1);
console.log(`Товар ${items[0]}`);
// Товар Телепорт бытовой VZHIH-101 (остаток 2, в резерве 1)

console.log(`Товар ${items[1]}`);
// Товар Ховерборд Mattel 2016 (остаток 6, в резерве 8)
items[1].unhold();
console.log(`Товар ${items[1]}`);
// Товар Ховерборд Mattel 2016 (остаток 14, в резерве 0)

// task 2
console.log("==== TASK 2 ====");

for (let item of positions) {
  Object.defineProperty(item, "finalPrice", {
    get() {
      return this.price - this.price * this.discount * 0.01;
    },
    set(value) {
      if (value < this.price) {
        this.discount = (item.price - value) / this.price * 100;
      } else {
        throw new Error(`Конечная цена, больше, чем базовая цена, пересчет скидки невозможен!`);
      }
    }
  });
}

console.log(positions[0].finalPrice); // 9300
positions[2].finalPrice = 28500;
console.log(positions[2].discount); // 50

//task3
console.log("==== TASK 3 ====");

const requiredFields = ['title', 'price', 'discount'];
let form1 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 7800,
  discount: 0
};
let form2 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  discount: 10
}

let form3 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 15000,


}

function isValidPosition(form, fields) {
  let keysFileds = Object.keys(form);
  for (let i in fields) {
    const item = fields[i];
    if (form[item] == undefined) {
      return false;
    }
  }
  return true;
}

if (isValidPosition(form1, requiredFields)) {
  console.log('Форма № 1 заполнена верно');
} else {
  console.log('В форме № 1 не заполнены необходимые поля');
}

if (isValidPosition(form2, requiredFields)) {
  console.log('Форма № 2 заполнена верно');
} else {
  console.log('В форме № 2 не заполнены необходимые поля');
}

if (isValidPosition(form3, requiredFields)) {
  console.log('Форма № 3 заполнена верно');
} else {
  console.log('В форме № 3 не заполнены необходимые поля');
}