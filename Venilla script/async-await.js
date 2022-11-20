// const func1 = () => {
//     return Promise.resolve(" I am resolve")
// }

// func1()
// .then ((result) => {
//     console.log(result)
// })

const func2 = async() => {
    //logic 
    // success, failure
    let bool_success = true; //false
    

    if(bool_success){
        return "I am resolved"
    } else {
        throw "I am rejected"
        //return "I am rejected"
    }
}

// func2()
// .then((result) => {
//     console.log("then",result)
// })
// .catch((err) => {
//     console.log("catch",err)
// })

// try{
    
// func2()
// .then((result) => {
//     console.log("then",result)
// })
// .catch((err) => {
//     console.log("catch",err)
// })
// } catch(exception){

// }

const func3 = async () => {
    
    try{
        let result = await func2();
        console.log(result)
    }catch(rej){
        console.log(rej)
    }
}
// func3()



