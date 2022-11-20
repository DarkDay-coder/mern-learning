/**
 * a. if-else block
 * b. else-if block
 * c. switch cases
 * d. loop
 *      a. while 
 *      b. for
 *      c. array loop
 *          - .map
 *          - .each
 *          - .foreach
 *          - .filter
 */

let Product = {
    name: "test product",
    price: 10000,
    discount: 10
};

if(Product.discount > 0){
    //statements and logic

} else {
    //optional
}

//WAP to create a variable called day. the day can hold any name of the day. print if day => Saturday => Holiday. if day => friday => Weekend, else print Weekday

// let day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
// let day = "Friday";
// if (day === "Saturday"){
//     console.log("Holiday");
// } else {
//     if (day === "Friday"){
//     console.log("Weekend");
//     } else {
//     console.log("Weekday");
//     }
// }

let day = "Friday";
if (day === "Saturday"){
    console.log("Holiday");
} else if (day === "Friday"){
    console.log("Weekend");
    } 
    else {
    console.log("Weekday");
}

//WAP to calculate percentage based on the score secured. 
// print = per >= 80 => Distinction
// print = per < 80 && >60 => First division
// print = per < 60 && >45 => Third division
// print = per < 80 && >60 => First division
// print = per < 45 && >32 => Second division
// print = per < 32 => Sorry you are failed
// 


// let score = {
//     math : 80,
//     science : 60,
//     nepali : 40,
//     english : 70
// }
let score = [];
let total = score[0] + score[1] + score[2] + score[3];
let per = total / score.length * 100;

if (per >= 80){
    console.log("Distinction");
} else if (per >= 60 && per < 80){
    console.log("first division");
} else if (per >= 45 && per < 60) {
    console.log("second division");
} else if ( per >= 32 && per < 45){
    console.log("third division");
} else {
    console.log("sorry! you are failed")
}

/**
 * 
 * 20 units -> 80
 * upto 30 per unit 4
 * upto 40 per unit 5
 * upto 50 per unit 6
 * remaining unit per unit 7
 * 
 */

/**
 * IRD 
 * 
 * 450000  1%
 * 200000  15%
 * 300000  25%
 *         35%
 * let yearly income = 1000000;
 */ 


let act = "add";

switch(act){
    case "add":
        //body
        break;
    case "edit":
        //body
        break;
    case "delete":
        //body
        break;
    default:
        //body
}

switch(act){
    case "add":
    case "edit":
        //body
        break;
    case "delete":
        //body
        break;
    default:
        //body
}
let a = 1;
console.log("hell")
if(a){
    console.log("true");
}