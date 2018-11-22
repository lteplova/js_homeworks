'use strict';

//task1
console.log('===TASK1===\n');
function checkCoupon(code) {
  let stringN = code.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  let stringR = stringN.split('').reverse().join('').toLowerCase();
  //return stringN == stringR && stringN.length > 9
  if (stringN == stringR && stringN.length >= 10) {
    return true;
  }
  return false;
}

let codes = [
  'Madam, I’m Adam',
  'A man, a plan, a canal. Panama',
  '----<-------Eve------->-----',
  '[__777-x-44-x-777__]',
  '1234564321',
  'Olson in Oslo'
];

for (let code of codes) {
  let result = checkCoupon(code) ? 'подходит' : 'не подходит';
  console.log(`Код «${code}» ${result}`);
}

// Код «Madam, I’m Adam» подходит
// Код «A man, a plan, a canal. Panama» подходит
// Код «----<-------Eve------->-----» не подходит
// Код «[__777-x-44-x-777__]» подходит
// Код «1234564321» не подходит
// Код «Olson in Oslo» подходит

//task2
console.log('\n===TASK2===\n');

function stripTags(text) {
  let textWithoutTag = text.replace(/\<[a-z/]+>/gi, '');
  return textWithoutTag;
}

const texts = [
  '<strong>Наши</strong> <em>ховерборды</em> лучшие в <u>мире</u>!',
  '<EM>Световой меч</EM> в <strong>каждый</strong> дом!'
];

for (let text of texts) {
  console.log(stripTags(text));
}

//task3
console.log('\n===TASK3===\n');

function validate(dataForms, requirements) {
  let result = [];
  requirements.forEach(function (element) {
    const rule = element.rule;
    switch (element.rule) {
      case 'email':
        dataForms[element.name] &&
          result.push(/@[a-z]+\./gi.test(dataForms[element.name]));
        break;
      case 'phone':
        dataForms[element.name] &&
          result.push(/^\+7[0-9]{10}$/g.test(dataForms[element.name]))
        break;
      default:
        dataForms[element.name] &&
          result.push(new RegExp(rule).test(dataForms[element.name]));
    }
  });

  return !result.filter((item) => item === false).length;
}

const fields = [
  { name: 'name', rule: /^[a-z ]{5,}$/i },
  { name: 'email', rule: 'email' },
  { name: 'phone', rule: 'phone' },
  { name: 'passport', rule: /\d{4}\s\d{6}/g}
];

const forms = [
  { name: 'Ivan Ivanov', email: 'ivan@test.co', phone: '+79212753690' },
  { name: 'III', email: 'ivan@test', phone: '11111' },
   { name: 'Petr Petrov', email: 'petrov@yandex.ru', passport: '8004 445678' }
];

for (let form of forms) {
  console.log(form);
  if (validate(form, fields)) {
    console.log('Ошибок нет');
  } else {
    console.log('Форма заполнена неверно');
  }
}

// { name: 'Ivan Ivanov',
//   email: 'ivan@test.co',
//   phone: '+79212753690' }
// Ошибок нет
// { name: 'III', email: 'ivan@test', phone: '11111' }
// Форма заполнена неверно