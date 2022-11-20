//function, method, task, event

//function declaration
//function definition
//funtion call / triger / invoke / fire

//definition
function addNumber(a, b){
    let c = a + b;
    return c;
}

const addNumber1 = function(a,b){
    let c = a + b;
    return c;
}

const functions = {
    addNumber : function(a,b){
        return a+b;
    }
}

//ES6 standard
//arrow notation
const addNumber2 = (a,b) => /*fat arrow */ { 
    return a+b;
}
console.log(addNumber2(10,15));

const addNumber3 = (a,b) => a+b;
console.log(addNumber(15,15));

//click event
console.log(this)

// const listenevent() => (e) => {
//     console.log("I am fired");
// }

// function listenevent(){
//     console.log(this)
//     console.log("I am fired");
// }

console.log(functions.addNumber(10,20));

//call
let result = addNumber(23,34);
console.log(result);

const htmlPrepare = () => (
    "html"
)
console.log(htmlPrepare);
