/**
 * create a class Product
 */

class Product {
    name;
    sp_price;
    cp_price;
    profit;
    loss;
    percent;
    constructor(_prodName,_spPrice,_cpPrice){
        this.name = _prodName;
        this.sp_price = _spPrice;
        this.cp_price = _cpPrice;

        this.profitLoss();
    }


    profitLoss = () => {
        if(this.sp_price>this.cp_price){
            this.profit = this.sp_price - this.cp_price
            console.log("Profit of : ", this.profit);
        } else{
            this.loss = this.cp_price - this.sp_price
            console.log ("Loss of : ", this.loss);
        }

        this.percentage();
    }
    percentage = () => {
        if(this.profit){
           this.percent = this.profit / this.cp_price * 100;
            console.log("Profit percentage: ", this.percent);
        } else if (this.loss){
            this.percent = this.loss / this.cp_price * 100;
            console.log("Loss percentage: ", this.percent);
        }
    }
}
let productName = "apple";
let sellingPrice = 300;
let costPrice = 350;
const prod_obj = new Product(productName, sellingPrice, costPrice);



//create a constructor to receive name, cp, sp
// create a function to find out profit or loss
// create a function to find out percent of profit or loss