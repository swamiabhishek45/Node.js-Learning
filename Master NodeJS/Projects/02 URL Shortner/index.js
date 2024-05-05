import express from "express";
import connectDB from "./connection.js";
import path from "path";
import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDB("mongodb://127.0.0.1:27017/URL").then(() => {
    console.log("MongoDB Connected!");
});

app.use(express.json());

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
