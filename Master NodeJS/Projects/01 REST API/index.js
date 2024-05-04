const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/user");
const { connectionDB } = require("./connection");
const { logReqRes } = require("./middlewares/index.middleware");

// const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// MongoDB Connection
connectionDB("mongodb://127.0.0.1:27017/nodejs").then(() => {
    console.log("MongoDB Connected !!!");
});

// Middleware
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (with support for arrays)

app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
