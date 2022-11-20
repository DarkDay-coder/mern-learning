// es5 module

const http = require("http");
const server = http.createServer((req, res) => {
    // server info
    // url information
    // client information
    // request header
    // session information
    // payload to the server
    // events
    let method = req.method;
    let url = req.url;
    console.log("req", method, url);
    if(url === "/" && method=== "GET"){
    let res_data = {
        banner: [],
        category: [],
        products: []
    }

    res.end(JSON.stringify(res_data));
    console.log("I am below the request response cycle")
} else if(url === "/" && method=== "POST"){
    let res_data = {
        id: [],
        banner: [],
        category: [],
        products: []
    }

    res.end(JSON.stringify(res_data));
    console.log("I am below the request response cycle")
} else if(url === "/" && method=== "PATCH"){
    let res_data = {
        name: [],
        banner: [],
        category: [],
        products: []
    }

    res.end(JSON.stringify(res_data));
    console.log("I am below the request response cycle")
}
    
   

});
// 0 - 2^16-1 => 0 - 65535


server.listen(3008, (error) => {
    if(error){
        console.log("Error listening to port: 3008")
    } else{
        console.log("Server is listening to port: 3008")
        console.log("press ctrl+c to end server.")
    }
}) 