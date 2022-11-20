// /**
//  * 
//  * by using promises ask user to provide cost price and selling price of a product
//  * check for the validation
//  * if validation is failure prompt user to reinput the value
//  * calculate profit/loss on the basis of user input
//  * create chain of promises to print either there is profit or loss
//  */

// let price = () => {
//     return new Promise((res,rej) => {

//     })

// }
// price()



// // let price = () => {
// //     return new Promise((res,rej) => {
// //         let priceList = { };
// //         let cp = prompt("enter cost price value: ");
// //         let sp = prompt("enter selling price value: ");
        
// //         if(!cp){
// //             prompt("Cp is empty please re-input: ")
// //         } else {
// //             priceList.cp = cp;
// //         }
// //         if(!sp){
// //             alert("sp is empty please re-input: ")
// //         } else {
// //             priceList.sp = sp;
// //         }

// //         if(cp && sp){
// //             resolve(priceList)
// //         } else{
// //             reject("sorry brother")
// //         }
// //     }) 
// // }
// // let profit =(cp,sp) => {
// //     return new Promise((res,rej) => {
// //         if(sp&&cp){
// //             if(cp>sp){
// //             resolve("there's a profit of NRs. ",result)
// //             }
// //         } else{
// //             resolve("there's a loss of NRs. ",result)
// //         }
// //     })
// // }
// // price()
// //     .then((data) => {
// //         console.log(data);
// // })


/**
 * by using promises ask user to provide cost price and selling price of a product
 * check for the validation
 * if validation is failure prompt user to reinput the value
 * calculate profit/loss on the basis of user input
 * create chain of promises to print either there is profit or loss
 */

let products = []
let ind_product = {
    name: "",
    cp: null,
    sp: null
}
const userInput = () => {
    const name = prompt("enter product name: ");
    var cp = Number(prompt("enter cost price: "));
    // if(cp<=0){
    //     cp = Number(prompt("enter cost price(cp should be always greater than 0): "));
    //     if(cp<=0){
    //     cp = Number(prompt("enter cost price(cp should be always greater than 0): "));
    //     }
    // }
    validatePrice(cp);
    console.log(cp)

    var sp = Number(prompt("enter selling price: "));
    validatePrice(sp);
    console.log(sp);

    let lp = calculateProfitLoss(cp,sp);

    ind_product = {
        ...lp,
        name: name,
        cp: cp,
        sp: sp
    }

    console.log(ind_product);

}
const calculateProfitLoss = (cp,sp) => {
    let result = {};
    let res;
    if(cp>sp){
        //loss
        let res = cp-sp;
        result = {
            profit: res
        }
    } else{
        //profit
        let res = sp-cp;
        result = {
            profit: res
        }
    }
    let per = (res / cp *100).toFixed(2);
    result = {
        ...result,
        percent: per,
    }
    return result;
}
const validatePrice = (price) => {
    if(price<=0) {
        price = Number(prompt("Re-enter your price. (Price should be always greater than 0)"));
        validatePrice(price);
    } else {
        return price;
    }
}
// userInput();