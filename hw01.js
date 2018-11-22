//task 1
'use strict'
var productName;
var productPriсe;

//task 2
productName = 'Телепорт бытовой VZHIH-101';
productPriсe = 10000;
console.log(`В наличии имеется: ${productName}`);
console.log(`Стоимость товара ${productPriсe} Q`);

//task 3
var productAmount = 2;
var discount = 0.1;
var totalCheck;
var discountValue;
discountValue = productAmount * productPriсe * discount;
totalCheck = productAmount * productPriсe - discountValue;
console.log(`Цена покупки составит ${totalCheck} Q`);

// task 4
var commonMoney = 52334224;
var itemPrice = 6500;
var totalVolume = Math.floor(commonMoney / itemPrice);
var remainMoney = commonMoney % itemPrice;
console.log(`Мы можем закупить ${totalVolume} единиц товара, после закупки на счету останется ${remainMoney} Q`);