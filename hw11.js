'use strict';

//task1
console.log('===TASK1===');
const clients = [{
  name: 'Филип Фрай',
  email: 'fray@mail.un',
  isSubscribed: false,
  orders: [11700, 1980, 450, 5500]
}, {
  name: 'Бендер Сгибатель Родригес',
  email: 'bender.rodriges@rambler.un',
  isSubscribed: true,
  orders: [440, 226, 7650, 2990, 70]
}, {
  name: 'Доктор Джон Зоидберг',
  email: 'zoidberg-md@list.un',
  isSubscribed: true,
  orders: [720]
}];

function findByName(name) {
  return clients.find(item => item.name == name);
}
clients.findByName = findByName;

const clientOne = clients.findByName('Доктор Джон Зоидберг');
console.log(clientOne.email); // zoidberg-md@list.un
const clientTwo = clients.findByName('Люрр');
console.log(typeof clientTwo); // undefined

//task2
console.log('===TASK2===');

function compareByTotalSumm(left, right) {
  const leftSum = left.orders.reduce((sum, curr) => {
    return sum += curr;
  });
  const rightSum = right.orders.reduce((sum, curr) => {
    return sum += curr;
  });
  
  if (rightSum > leftSum) return 1;
  if (rightSum < leftSum) return -1;
  if (rightSum === leftSum) return 0;
}

clients
  .sort(compareByTotalSumm)
  .forEach(client => console.log(client.name));

  //task3
console.log('===TASK3===');

function sendMail(email) {
  console.log(`Письмо отправлено на адрес ${email}`);
}

function getSubscribedEmails (list) {
return clients.map (item => item.isSubscribed && item.email).filter(item => item);
}

getSubscribedEmails(clients).forEach(sendMail);