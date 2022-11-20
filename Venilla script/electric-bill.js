/**
 * WAP to calcuate electric bill fair price based on given conditions
 * if unit upto 20 base rate = 80
 * if unit 20-30 the rate is 5 per unit
 * if unit 30-40 the rate is 6 per unit
 * if unit 40 above the rate is 7 per unit
 */

console.log('hello')
let unit = 75;
let cost = 80;
let base_unit = 20; 
if(unit > base_unit){
    let temp = unit - base_unit;
    if(temp >= 10){
        cost += 50;
        base_unit += 10;
    let temp = unit - base_unit;
        if(temp >= 10){
            cost += 60;
            base_unit += 10;
            let temp = unit - base_unit;
            if(temp >= 10){
                cost += 60;
                base_unit += 10;
                let temp = unit - base_unit;
                if(temp){
                    cost += temp * 8;
                }
            } else{
                cost += temp*7;
            }
        }else {
        cost += temp*6;
        }
    }else {
        cost += temp*5;
    }
}

console.log(cost);
console.log(unit);

let total_charge = 0;
let units = 35;
if (units<=20){
    total_charge = 80;
} else if(units<=30){
    total_charge = 80 + (units - 20) * 5;
} else if(units<=40){
    total_charge = 80 + 50 + (units - 20 - 10) * 6;
} else if(units<=50){
    total_charge = 80 + 50 + 60 + (units - 20 - 10 - 10) * 7;
}
console.log(total_charge);

