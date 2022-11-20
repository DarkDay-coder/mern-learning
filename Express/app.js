const express = require("express");
const app = express();



//server running
const port = 3000;
app.listen(port, "localhost", (err) => {
    if (err) {
        console.log("Error: ", err);
        console.log("Press Ctrl+C to end the server.");
    } else {
        console.log("server is running at port: ", port);
        console.log("Press Ctrl+C to end the server.");
    }
});