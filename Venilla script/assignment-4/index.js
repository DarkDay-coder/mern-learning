/**
 * WAP to calculate profit and loss on the basis of the product value
 * create an array of products with cp,sp
 * if cp>sp => loss
 * if cp<sp => profit
 * calculate profit/loss amount and percentage
 * profit/loss / cp * 100
 * assign to the respective product 
 * and print the values in a table
 */
// console.log("Sibu Dhital is not a programmer!!");
let products = [
    {
        name: "note-20",
        brand: "samsung",
        cp: 125000,
        sp: 135000,
    },
    {
        name: "iPhone-12",
        brand: "apple",
        cp: 185000,
        sp: 182000,
    },
    {
        name: "note-10",
        brand: "samsung",
        cp: 118000,
        sp: 127000,
    },
    {
        name: "iPhone-13",
        brand: "apple",
        cp: 212000,
        sp: 207000,
    },
    {
        name: "iPhone-11",
        brand: "apple",
        cp: 127500,
        sp: 115000,
    },
    {
        name: "mate-20 pro",
        brand: "Huawei",
        cp: 50000,
        sp: 110000,
    },
    {
        name: "In1b",
        brand: "micromax",
        cp: 18000,
        sp: 38000,
    }
]
let size = products.length;
function calculateProfitLoss(cp,sp) {
    let result = 0;
    let percent = 0;
    let return_set = { };
    if(cp>sp){
        result = cp - sp;
        return_set = {
            loss: result
        }
    } else {
        result = sp - cp;
        return_set = {
            profit: result
        }
    }
    percent = (result/cp * 100).toFixed(2);
    return {
        ...return_set,
        per: percent
    }
}
for(let i = 0; i<size; i++){
    let result  = calculateProfitLoss(products[i].cp,products[i].sp);
    products[i] = {
        ...products[i],
        ...result
    }
}

let htmlContent = "";

for(let i = 0; i<size; i++){
    let result  = calculateProfitLoss(products[i].cp,products[i].sp);
    products[i] = {
        ...products[i],
        ...result
    }
    htmlContent += "<tr>"
    htmlContent += "<td>"+(i+1)+"</td>";
    htmlContent += "<td>"+(products[i].name) + "</td>";
    htmlContent += "<td>" + (products[i].brand) + "</td>";
    htmlContent += "<td>NRs. " + (products[i].cp) + "</td>";
    htmlContent += "<td>NRs. " + (products[i].sp) + "</td>";
    htmlContent += "<td>" + ((products[i].loss ? "(" : "" ))+"NRs. "+(products[i].loss?products[i].loss: products[i].profit)+((products[i].loss ? ")" : "" ))+"</td> ";
    htmlContent += "<td>" + ((products[i].loss ? "(" : "" ))+(products[i].per)+((products[i].loss ? "%)" : "%" ))+"</td> ";
    htmlContent += "</tr>"

}
document.getElementById('content').innerHTML = htmlContent;