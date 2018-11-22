'use strict';
class Calendar {
  constructor(now = new Date()) {
    this.now = now;
  }

  setDate(now) {
    this.now = now;
  }

  get today() {
    return this.now.toLocaleString('ru-Ru');
  }
}

class PaymentTerminal {
  constructor(title, calendar) {
    this.title = title;
    this.calendar = calendar;
  }

  get status() {
    return this.isActive ? 'работает' : 'недоступен';
  }

  get isActive() {
    return this.checkActive();
  }

  checkActive() {
    return false;
  }
}

class RegistrationError extends Error {
  constructor(field = null) {
    super(`Ошибка в поле ${field}`);
    this.field = field;
  }
}

class NotValidEmailRegistrationError extends RegistrationError {
  constructor(field, email) {
    super(field);
    this.email = email;
  }
}

class NotUniqueRegistrationError extends RegistrationError {
  constructor(field, value) {
    super(field);
    this.value = value;
  }
}

class NotSameRegistrationError extends RegistrationError { }

function isValidEmail(email) {
  return /^\w+(\.\w+)*@\w+(\.\w+)+$/i.test(email);
}

function isUniqueLogin(login) {
  return !['admin', 'boss'].includes(login);
}

function checkPassword(original, copy) {
  return original === copy;
}

function registerNewUser(data) {
  if (!isValidEmail(data.email)) {
    throw new NotValidEmailRegistrationError('Адрес электронной почты', data.email);
  }
  if (!isUniqueLogin(data.login)) {
    throw new NotUniqueRegistrationError('Логин', data.login);
  }
  if (!checkPassword(data.password, data.passwordCopy)) {
    throw new NotSameRegistrationError('Пароль');
  }
}

//task1
console.log('\n===TASK1= \n');

class SpaceDate extends Date { }

SpaceDate.prototype.copy = function () {
  return new SpaceDate(this);
};

SpaceDate.prototype.getNextDate = function () {
  const newDate = this.copy();
  newDate.setDate(this.getDate() + 1);
  return newDate;
};

SpaceDate.prototype.getPrevDate = function () {
  const newDate = this.copy();
  newDate.setDate(this.getDate() - 1);
  return newDate;
};

SpaceDate.prototype.getDayBeginning = function () {
  const newDate = this.copy();
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  return newDate;
};

SpaceDate.prototype.getDayEnd = function () {
  const newDate = this.copy();
  newDate.setHours(23);
  newDate.setMinutes(59);
  newDate.setSeconds(0);
  return newDate;
};


let dateOriginal = new SpaceDate(2017, 1, 22);
let dateCopy = dateOriginal.copy();
dateCopy.setYear(2022);

console.log(`Оригинальная дата: ${dateOriginal.toLocaleDateString('ru-Ru')}`);
console.log(`Измененная копия: ${dateCopy.toLocaleDateString('ru-Ru')}`);

let orderDate = new SpaceDate(2017, 2, 10);
let deliveryDate = orderDate.getNextDate();
console.log(`Дата заказа: ${orderDate.toLocaleDateString('ru-Ru')}`);
console.log(`Дата доставки: ${deliveryDate.toLocaleDateString('ru-Ru')}`);

let supplyDate = new SpaceDate(2017, 3, 3);
let requestDate = supplyDate.getPrevDate();
console.log(`Дата поставки: ${supplyDate.toLocaleDateString('ru-Ru')}`);
console.log(`Дата заявки поставщику: ${requestDate.toLocaleDateString('ru-Ru')}`);

let garantDate = new SpaceDate(2017, 2, 10, 12, 44);
let endGarant = garantDate.getNextDate();
endGarant.setYear(endGarant.getFullYear() + 2);
console.log(`Дата окончания гарантии: ${endGarant.toLocaleString('ru-Ru')} `);

//мой пример:
let someDate = new SpaceDate(2017, 2, 10, 12, 44);
let from = someDate.getDayBeginning();
let to = someDate.getDayEnd();
console.log(`В любое время с ${from.toLocaleString('ru-Ru')} по ${to.toLocaleString('ru-Ru')}`);


//task2
console.log('\n===TASK2= \n');

class AllDayPaymentTerminal extends PaymentTerminal {
  constructor(title, calendar) {
    super(title, calendar);
    this.calendar = calendar;
  }
  checkActive() {
    return true;
  }
}

class AllDayExceptHolidaysPaymentTerminal extends PaymentTerminal {
  constructor(title, calendar, holidays) {
    super(title, calendar, holidays);
    this.calendar = calendar;
    this.holidays = holidays;
  }
  checkActive() {
    return !this.holidays.find(item => {
      return item.date == this.calendar.now.getDate();
    });
  }
}

class WorkspacePaymentTerminal extends PaymentTerminal {
  constructor(title, calendar) {
    super(title, calendar);
  }
  checkActive() {
    return this.calendar.now.getDay() > 0 &&  // воскресенье
      this.calendar.now.getDay() < 6 &&  // суббота
      this.calendar.now.getHours() >= 8 &&
      this.calendar.now.getHours() < 18;
  }
}

// 23.02.2017, 0:00:00
// Терминал в офисе Убербанка недоступен
// Терминал в аэропорту работает
// Терминал в торговом центре недоступен
// 11.03.2017, 0:00:00
// Терминал в офисе Убербанка недоступен
// Терминал в аэропорту работает
// Терминал в торговом центре недоступен
// 14.03.2017, 18:01:00
// Терминал в офисе Убербанка недоступен
// Терминал в аэропорту работает
// Терминал в торговом центре работает
// 14.03.2017, 8:03:00
// Терминал в офисе Убербанка работает
// Терминал в аэропорту работает
// Терминал в торговом центре работает



////////
const holidays = [
  { date: 11, month: 3 - 1 },
  { date: 23, month: 2 - 1 }
];

const calendar = new Calendar();
const terminals = [
  new WorkspacePaymentTerminal('Терминал в офисе Убербанка', calendar),
  new AllDayPaymentTerminal('Терминал в аэропорту', calendar),
  new AllDayExceptHolidaysPaymentTerminal('Терминал в торговом центре',
    calendar, holidays)
];

function showTerminals(date) {
  if (date !== undefined) {
    calendar.setDate(date);
  }
  console.log(calendar.today);
  terminals
    .filter(terminal => terminal instanceof PaymentTerminal)
    .forEach(terminal => console.log(`${terminal.title} ${terminal.status}`));
}

showTerminals(new Date(2017, 2 - 1, 23));
showTerminals(new Date(2017, 3 - 1, 11));
showTerminals(new Date(2017, 3 - 1, 14, 18, 1));
showTerminals(new Date(2017, 3 - 1, 14, 8, 3));

//мой пример:
showTerminals(new Date(2017, 3 - 1, 23, 18, 1));

//task3
console.log('\n===TASK3= \n');


function handleRegistration(data) {
  try { 
    registerNewUser(data);
    console.log(`Пользователь успешно зарегистрирован`);
  } catch (e) {
    if (e instanceof NotValidEmailRegistrationError) {
      console.log(`«${data.email}» не является адресом электронной почты`);
    }
    if (e instanceof NotUniqueRegistrationError) {
      console.log(`Пользователь с логином «${data.login}» уже зарегистрирован`);
    }
    if (e instanceof NotSameRegistrationError) {
      console.log(`Введенные пароли не совпадают`);
    } 
  }
}


const notValidEmailUser = { email: 'test' };
handleRegistration(notValidEmailUser);

const notUniqueLoginUser = { email: 'test@test.co', login: 'boss' };
handleRegistration(notUniqueLoginUser);

const differentPwUser = {
  email: 'test@test.co', login: 'ivan',
  password: '123', passwordCopy: '456'
};
handleRegistration(differentPwUser);

const normalUser = { email: 'test@test.co', login: 'ivan', password: '123', passwordCopy: '123' };
handleRegistration(normalUser);

//мой пример:
const diffPass = { email: 'user@mail.co', login: 'user', password: '111', passwordCopy: '123' };
handleRegistration(diffPass);