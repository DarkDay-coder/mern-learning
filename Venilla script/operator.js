/**
 * a. Arithmetic Operator
 *          +, -, *, /, %
 * 
 * b. Concatination Operator
 *          +  and  , 
 * 
 * c. Increment, Decrement
 * 
 * 
 * d. Assignment Operator
 *      =, +=, -=, *=, /=
 * 
 * e. Comparision Operator
 *  <,>,<=,>=,==,!=, <>, ===, !==
 * 
 * f. logical operator
 *      &&, ||, !
 * 
 * g. Conditional Operator
 *      Single line if-else statement
 *      (expression) ? true statement : false statement
 *      data ?? default
 *      
 * h. Spread Operator
 *      ...
 * 
 * i. Object Destructuring
 * 
 * j. rest operator
 *      
 */

let age = x ? x: null;
let gender = M || null;



let user = {
    name : "sibu",
    orgn : "BIN",
    position: "student"
}
let admin_user = {
    // name : "sibu",
    // orgn : "BIN",
    // position: "student",
    ...user,
    role: "learner",
    joined_date: null
}


//Object distructuring

// let name = admin_user.name;
// let orgn = admin_user.orgn;
// let role = admin_user.role;
// let position = admin_user.position;


// let {name, orgn, role} = admin_user;

let {name, orgn, role, ...rest} = admin_user;

