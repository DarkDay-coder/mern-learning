/**
 * 
 */

const prom1 = () => {
    
        return Promise.resolve("I am resolve")

        // res()
        // rej();
    
}

const prom2 =() => {
    return Promise.reject("I am reject")
}

prom1()
.then((data) => {
    console.log(data);
}) //.catch()

prom2() 
//.then()
.catch((error) => {
    console.log(error)
})


