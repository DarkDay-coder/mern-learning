/**
 * 
 * a. Data Encapsulation => 
 * b. Abstraction => 
 * c. Inheritance => 
 * d. Polymorphism => 
 * e. Overloading/Overriding => 
 * f. Efficiency =>
 * g. Modularity => 
 * 
 */

// prototype based OOP
function Student(){
    this.name = "Sibu Dhital";
}
let student_obj = new Student();
Student.prototype.getName = function(){
    return this.name;
}
console.log(student_obj.name);
console.log(student_obj.getName());
