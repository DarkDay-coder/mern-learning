let products = [
    {
        name: "product-1",
        category: "cat-1",
        price: 100,
        discount: 10
    },
    {
        name: "product-2",
        category: "cat-2",
        price: 200,
        discount: 15
    },
    {
        name: "product-3",
        category: "cat-3",
        price: 250,
        discount: 8
    },
    {
        name: "product-4",
        category: "cat-4",
        price: 380,
        discount: 9
    },
    {
        name: "product-5",
        category: "cat-5",
        price: 30,
        discount: 4
    },
]; 
let prod_length = products.length;
let j = 0;
let html_content = "";
while(j<prod_length){
    let after_discount = products[j].price - (products[j].price * products[j].discount / 100);
    html_content += "<tr>"
    html_content += "<td>"+(j+1)+"</td>";
    html_content += "<td>" + (products[j].name) + "</td>";
    html_content += "<td>" + (products[j].price) + "</td>";
    html_content += "<td>" + (products[j].category) + "</td>";
    html_content += "<td>" + (products[j].discount) + "%</td>";
    html_content += "<td>" + (after_discount) + "</td>";
    html_content += "</tr>";
    j++;
}
document.getElementById('content').innerHTML = html_content;