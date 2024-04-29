const http = require("http");
const fs = require("fs");
const url = require('url');

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
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
