const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} New Req Received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case "/":
                res.end("Welcome To Homepage");
                break;
            case "/about":
                res.end("Hello, I'm Abhishek. This is about page");
                break;
            default:
                res.end("404 not found")
        }
    });
});

myServer.listen(8000, () => {
    console.log(`Server is listening on PORT 8000`);
});
