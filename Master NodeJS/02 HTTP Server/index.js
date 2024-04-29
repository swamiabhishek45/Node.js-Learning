const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

function myHandler(req, res, next) {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()} : ${req.method} ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                res.end("Welcome To Homepage");
                break;
            case "/about":
                const username = myUrl.query.myName;
                const userID = myUrl.query.userId;
                res.end(`Hello, I'm ${username} and my userID is ${userID}`);
                break;
            case "/signup":
                if (req.method === "GET")
                    return res.end(
                        "Welcome to Sign Up page"
                    ); // render login form here
                else if (req.method === "POST")
                    return res.end("You are successfully registered!"); // after submitting the form

            default:
                res.end("404 not found");
        }
    });
}

const myServer = http.createServer(myHandler);

myServer.listen(8000, () => {
    console.log(`Server is listening on PORT 8000`);
});
