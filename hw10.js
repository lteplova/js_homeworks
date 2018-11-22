'use strict';
const items = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    available: 7,
    holded: 0
  },
  {
    title: 'Ховерборд Mattel 2016',
    available: 4,
    holded: 5
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    available: 1,
    holded: 1
  }
];

//task1
console.log('===TASK1===');

const itemPrototype = {
  sell(field, amount = 1) {
    if (this[field] < amount) {
      throw `Недостаточно товара для продажи (${this[field]} из ${amount})`
    }
    this[field] -= amount;
    return true;
  },
  sellHolded(amount = 1) {
    return itemPrototype.sell.call(this, 'holded', amount);
  },
  sellAvailable(amount = 1) {
    return itemPrototype.sell.call(this, 'available', amount);
  }
};

function sellItem(item, amount, isHolded) {
  try {
    if (isHolded == true) {
      itemPrototype.sellHolded.call(item, amount);
    } else {
      itemPrototype.sellAvailable.call(item, amount);
    }
  }
  catch (e) {
    console.log(e);
  }
}

sellItem(items[2], 1);
console.log(items[2].available); // 0
console.log(items[2].holded); // 1

sellItem(items[1], 4, true);
console.log(items[1].available); // 4
console.log(items[1].holded); // 1

const item = { available: 0, holded: 1 };
sellItem(item, 1, true);
console.log(item.available); // 0
console.log(item.holded); // 0


//task2
console.log('===TASK2===');

function formatFull() {
  return `${this.title}:\n\tдоступно ${this.available} шт.\n\tв резерве ${this.holded} шт.`;
}

function formatLite() {
  return `${this.title} (${this.available} + ${this.holded})`;
}

function formatMy() {
  return `${this.title} \||\ ${this.available} \||\ ${this.holded}`;
}

function show(format) {
  console.log(format());
}

function showItems(list, formatter) {
  for (let item of list) {
    show(formatter.bind(item));
  }
}

showItems(items, formatFull);
console.log('---');
showItems(items, formatLite);
console.log('---');
showItems(items, formatMy);

//task2
console.log('===TASK3===');

function createButton(title, onclick) {
  return {
    title,
    onclick,
    click() {
      this.onclick.call(this);
    }
  };
}

function onclick() {
  console.log(`${this.title} добавлен в корзину`);
}

function createBuyButtons(items) {
  const buttons = [];
  for (let item of items) {
    buttons.push(createButton('Купить', onclick.bind(item)));
  }
  return buttons;
}

const buttons = createBuyButtons(items);
buttons[0].click();
buttons[2].click();
buttons[1].click();