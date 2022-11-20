/**
 * IRD 
 * 
 * 450000  1%
 * 200000  15%
 * 300000  25%
 *         35%
 * let yearly income = 1000000;
 */ 

let income = 8900000;
let tax = 0;
if (income <= 450000){
    tax = income * 1 / 100;
} else if (income <= 650000){
    tax = (450000 * 1 / 100) + ((income - 450000) * 15 /100);
} else if (income <= 950000){
    tax = (450000 * 1 / 100) + (200000 * 15 / 100) + ((income - 450000 - 200000) * 25 /100);
} else if (income > 950000){
    tax = (450000 * 1 / 100) + (200000 * 15 / 100) + (300000 * 15 / 100) + ((income - 450000 - 200000) * 25 / 100) + ((income - 450000 - 200000 - 300000) * 35 / 100);
}
console.log(" Your tax payable income is: ",income);
console.log(" Your Payable tax is: ",tax);
