let numbers = [1,2,3,4,5,6]
let initialSum = 0;
let result = numbers.reduce((preVal,curVal) => preVal+curVal, initialSum);
console.log(result)