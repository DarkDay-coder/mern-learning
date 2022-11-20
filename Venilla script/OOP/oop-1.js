/**
 * 
 */
class User{
    // data,attributes,properties
    // functions,method

    constructor() {
        console.log("I am constructor")
    }
    name;
    getName = () => {
        return this.name;
    }
}
const user_obj = new User();
user_obj.name = "Sibu Dhital";
console.log(user_obj.getName());
console.log(user_obj.name);



